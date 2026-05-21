const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

const dbPath = path.resolve(process.env.DB_PATH || "./database/inventory.db");
const db = new Database(dbPath);

// Create the products table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("✅ Database connected at:", dbPath);

module.exports = db;
