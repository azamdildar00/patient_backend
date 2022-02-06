-- Up

CREATE TABLE patient (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    disease TEXT
);

CREATE TABLE treatment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT,
    disease TEXT,
    prescription BOOLEAN
);

-- Down
-- DROP TABLE records;