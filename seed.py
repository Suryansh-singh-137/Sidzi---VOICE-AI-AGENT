"""Creates the tables and fills them with demo data.

Run:  python seed.py
Running it again RESETS everything (all bookings are cleared).
"""
import asyncio
import os
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import asyncpg
from dotenv import load_dotenv

load_dotenv()

CLINIC_TZ = ZoneInfo(os.getenv("CLINIC_TIMEZONE", "Asia/Kolkata"))

PATIENTS = [
    # name, date of birth, copay, deductible, prescriptions
    ("Maria Gonzalez", date(1985, 3, 14), "$20", "$500", ["Amoxicillin"]),
    ("Travis", date(1997, 7, 14), "$15", "$250", ["Lisinopril"]),
    ("Robert Chen", date(1958, 5, 9), "$10", "$0", ["Lisinopril", "Lorazepam"]),
]

# hour, minute, doctor
SLOT_TIMES = [
    (9, 0, "Dr. Miller"),
    (14, 30, "Dr. Miller"),
    (11, 0, "Dr. Sharma"),
]


async def main() -> None:
    conn = await asyncpg.connect(os.getenv("DATABASE_URL"))
    try:
        # 1. Create the tables
        await conn.execute(Path("schema.sql").read_text())

        # 2. Clear old data
        await conn.execute(
            "TRUNCATE appointments, prescriptions, patients RESTART IDENTITY CASCADE"
        )

        # 3. Insert patients and their prescriptions
        for name, dob, copay, deductible, meds in PATIENTS:
            patient_id = await conn.fetchval(
                "INSERT INTO patients (name, date_of_birth, copay, deductible) "
                "VALUES ($1, $2, $3, $4) RETURNING id",
                name, dob, copay, deductible,
            )
            for med in meds:
                await conn.execute(
                    "INSERT INTO prescriptions (patient_id, medication) VALUES ($1, $2)",
                    patient_id, med,
                )

        # 4. Insert appointment slots for the next 7 days (skip Sundays)
        now = datetime.now(CLINIC_TZ)
        count = 0
        for offset in range(1, 8):
            day = now + timedelta(days=offset)
            if day.weekday() == 6:  # Sunday
                continue
            for hour, minute, doctor in SLOT_TIMES:
                starts_at = day.replace(hour=hour, minute=minute, second=0, microsecond=0)
                await conn.execute(
                    "INSERT INTO appointments (starts_at, doctor) VALUES ($1, $2)",
                    starts_at, doctor,
                )
                count += 1

        print(f"Done. {len(PATIENTS)} patients and {count} open slots created.")
    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
