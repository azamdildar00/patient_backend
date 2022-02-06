-- Up
DROP TABLE records;
CREATE IF NOT TABLE records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
)


-- Down