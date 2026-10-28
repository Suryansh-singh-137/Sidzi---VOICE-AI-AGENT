from typing import Dict, Any, Optional

# Synthetic patient records for demo testing
PATIENTS_DATABASE = {
    ("maria gonzalez", "1985-03-14"): {
        "id": "p_01",
        "name": "Maria Gonzalez",
        "insurance": {"copay": "$20", "deductible": "$500"},
        "prescriptions": ["Amoxicillin"]
    },
    ("travis", "1997-07-14"): {
        "id": "p_02",
        "name": "Travis",
        "insurance": {"copay": "$15", "deductible": "$250"},
        "prescriptions": ["Lisinopril"]
    },
    ("robert chen", "1958-05-09"): {
        "id": "p_03",
        "name": "Robert Chen",
        "insurance": {"copay": "$10", "deductible": "$0"},
        "prescriptions": ["Lisinopril", "Lorazepam"]  # Controlled substance!
    }
}

# Available slots represented by OPAQUE HANDLES (s1, s2)
# The AI only gets to pick these handles, preventing invented dates/times
APPOINTMENT_SLOTS = {
    "s1": {"label": "Thursday at 9:00 AM", "doctor": "Dr. Miller", "booked": False},
    "s2": {"label": "Thursday at 2:30 PM", "doctor": "Dr. Miller", "booked": False},
    "s3": {"label": "Friday at 11:00 AM", "doctor": "Dr. Sharma", "booked": False},
}

CONTROLLED_DRUGS = {"lorazepam", "adderall", "oxycodone", "xanax", "morphine"}


def find_patient(name: str, dob: str) -> Optional[Dict[str, Any]]:
    """Strict code verification: matches normalized name and date of birth."""
    key = (name.strip().lower(), dob.strip())
    return PATIENTS_DATABASE.get(key)


def get_open_slots() -> str:
    """Returns available slots formatted with their handles."""
    available = [f"{handle}: {data['label']} with {data['doctor']}" 
                 for handle, data in APPOINTMENT_SLOTS.items() if not data["booked"]]
    if not available:
        return "There are no open appointment slots available."
    return "Available slots: " + "; ".join(available)


def confirm_booking(slot_handle: str, patient_name: str) -> str:
    """Deterministic slot assignment with concurrency check."""
    slot = APPOINTMENT_SLOTS.get(slot_handle.lower().strip())
    if not slot:
        return "That slot handle is invalid. Please pick from the available slots."
    if slot["booked"]:
        return "That slot was just booked by another caller. Please choose another."
    
    slot["booked"] = True
    slot["patient"] = patient_name
    return f"Appointment confirmed for {patient_name} on {slot['label']} with {slot['doctor']}."


def evaluate_refill(medication: str) -> Dict[str, Any]:
    """Plain-code safety check: flags controlled substances for nurse handoff."""
    med = medication.strip().lower()
    if med in CONTROLLED_DRUGS:
        return {
            "action": "TRANSFER",
            "message": f"{medication.capitalize()} is a controlled substance and requires clinical nurse authorization. I am putting you in line for a nurse transfer."
        }
    return {
        "action": "APPROVED",
        "message": f"Your refill for {medication.capitalize()} has been submitted to your clinic pharmacy."
    }