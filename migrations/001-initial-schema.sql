-- Up
CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
)


-- Down
-- DROP TABLE records;