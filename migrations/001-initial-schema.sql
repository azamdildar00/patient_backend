-- Up

CREATE TABLE patient (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
);

CREATE TABLE treatment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

-- Down
-- DROP TABLE records;