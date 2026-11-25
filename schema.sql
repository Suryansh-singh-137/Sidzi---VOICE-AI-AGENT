-- Sidzi database schema

CREATE TABLE IF NOT EXISTS patients (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    copay         TEXT,
    deductible    TEXT
);

-- Same name + date of birth cannot be added twice (ignores upper/lower case)
CREATE UNIQUE INDEX IF NOT EXISTS patients_name_dob_idx
    ON patients (lower(name), date_of_birth);

CREATE TABLE IF NOT EXISTS prescriptions (
    id         SERIAL PRIMARY KEY,
    patient_id INT  NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    medication TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
    id         SERIAL PRIMARY KEY,
    starts_at  TIMESTAMPTZ NOT NULL,
    doctor     TEXT NOT NULL,
    patient_id INT REFERENCES patients(id)   -- stays empty (NULL) until someone books it
);

CREATE INDEX IF NOT EXISTS appointments_open_idx
    ON appointments (starts_at) WHERE patient_id IS NULL;
