"""Clinic rules, now backed by PostgreSQL.

Same function names as before, but they are async now (use `await`).
"""
import os
import re
from datetime import datetime
from typing import Any, Dict, Optional
from zoneinfo import ZoneInfo

from db import get_pool

CLINIC_TZ = ZoneInfo(os.getenv("CLINIC_TIMEZONE", "Asia/Kolkata"))

# This safety rule stays in plain code on purpose
CONTROLLED_DRUGS = {"lorazepam", "adderall", "oxycodone", "xanax", "morphine"}


# ---------- small helpers ----------

def normalize_dob(dob: str) -> str:
    """Turn common spoken or written date formats into YYYY-MM-DD."""
    cleaned = dob.strip()
    date_formats = [
        "%Y-%m-%d",
        "%B %d, %Y",
        "%B %d %Y",
        "%b %d, %Y",
        "%b %d %Y",
        "%m/%d/%Y",
        "%m-%d-%Y",
        "%d/%m/%Y",
        "%Y/%m/%d",
    ]
    for fmt in date_formats:
        try:
            return datetime.strptime(cleaned, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return cleaned


def _slot_label(starts_at: datetime) -> str:
    """Make a speakable label like 'Thursday, November 26 at 9:00 AM'."""
    local = starts_at.astimezone(CLINIC_TZ)
    hour12 = local.hour % 12 or 12
    am_pm = "AM" if local.hour < 12 else "PM"
    return f"{local:%A, %B} {local.day} at {hour12}:{local:%M} {am_pm}"


# ---------- patients ----------

async def find_patient(name: str, dob: str) -> Optional[Dict[str, Any]]:
    """Match name and date of birth. Returns the patient, or None."""
    try:
        dob_date = datetime.strptime(normalize_dob(dob), "%Y-%m-%d").date()
    except ValueError:
        return None

    pool = await get_pool()
    row = await pool.fetchrow(
        "SELECT id, name, copay, deductible FROM patients "
        "WHERE lower(name) = lower($1) AND date_of_birth = $2",
        name.strip(), dob_date,
    )
    if row is None:
        return None

    meds = await pool.fetch(
        "SELECT medication FROM prescriptions WHERE patient_id = $1", row["id"]
    )
    return {
        "id": row["id"],
        "name": row["name"],
        "insurance": {"copay": row["copay"], "deductible": row["deductible"]},
        "prescriptions": [m["medication"] for m in meds],
    }


# ---------- appointments ----------

async def get_open_slots(limit: int = 6) -> str:
    """List the next free future slots. Handles look like s12 (opaque to the caller)."""
    pool = await get_pool()
    rows = await pool.fetch(
        "SELECT id, starts_at, doctor FROM appointments "
        "WHERE patient_id IS NULL AND starts_at > now() "
        "ORDER BY starts_at LIMIT $1",
        limit,
    )
    if not rows:
        return "There are no open appointment slots available."
    items = [f"s{r['id']}: {_slot_label(r['starts_at'])} with {r['doctor']}" for r in rows]
    return "Available slots: " + "; ".join(items)


async def confirm_booking(slot_handle: str, patient_id: int, patient_name: str) -> str:
    """Book a slot with ONE atomic update, so two callers cannot get the same slot."""
    match = re.fullmatch(r"s(\d+)", slot_handle.strip().lower())
    if not match:
        return "That slot handle is invalid. Please pick from the available slots."
    slot_id = int(match.group(1))

    pool = await get_pool()
    row = await pool.fetchrow(
        "UPDATE appointments SET patient_id = $1 "
        "WHERE id = $2 AND patient_id IS NULL AND starts_at > now() "
        "RETURNING starts_at, doctor",
        patient_id, slot_id,
    )
    if row is not None:
        return (
            f"Appointment confirmed for {patient_name} on "
            f"{_slot_label(row['starts_at'])} with {row['doctor']}."
        )

    # The update changed nothing. Find out why, to give a helpful answer.
    exists = await pool.fetchval("SELECT 1 FROM appointments WHERE id = $1", slot_id)
    if not exists:
        return "That slot handle is invalid. Please pick from the available slots."
    return "That slot is no longer available. Please choose another."


# ---------- refills ----------

async def evaluate_refill(medication: str, patient_id: int) -> Dict[str, Any]:
    """Check the patient's real prescriptions, then apply the controlled-drug rule."""
    med = medication.strip()
    pool = await get_pool()

    on_file = await pool.fetchval(
        "SELECT 1 FROM prescriptions WHERE patient_id = $1 AND lower(medication) = lower($2)",
        patient_id, med,
    )
    if not on_file:
        return {
            "action": "NOT_ON_FILE",
            "message": f"I don't see {med.title()} in your records. A staff member can help you with that.",
        }

    if med.lower() in CONTROLLED_DRUGS:
        return {
            "action": "TRANSFER",
            "message": (
                f"{med.title()} is a controlled substance and requires clinical nurse "
                "authorization. I am putting you in line for a nurse transfer."
            ),
        }

    return {
        "action": "APPROVED",
        "message": f"Your refill for {med.title()} has been submitted to your clinic pharmacy.",
    }
