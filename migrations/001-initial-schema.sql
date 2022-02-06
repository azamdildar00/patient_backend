-- Up
DROP TABLE records;
CREATE IF NOT EXISTS TABLE records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
)


-- Down