const Database = require('better-sqlite3');
const db = new Database('reliability.db');

// Creates the table the first time the app runs (does nothing if it already exists)
db.exec(`
  CREATE TABLE IF NOT EXISTS call_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    api_name TEXT,
    success INTEGER,
    response_time_ms INTEGER,
    error_message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

function logCall(apiName, success, responseTimeMs, errorMessage) {
  const stmt = db.prepare(`
    INSERT INTO call_logs (api_name, success, response_time_ms, error_message)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(apiName, success ? 1 : 0, responseTimeMs, errorMessage || null);
}

function getStats() {
  const rows = db.prepare(`
    SELECT
      api_name,
      COUNT(*) as total_calls,
      SUM(success) as successful_calls,
      AVG(response_time_ms) as avg_response_time
    FROM call_logs
    GROUP BY api_name
  `).all();

  return rows.map((row) => ({
    apiName: row.api_name,
    totalCalls: row.total_calls,
    successRate: ((row.successful_calls / row.total_calls) * 100).toFixed(1),
    avgResponseTime: Math.round(row.avg_response_time),
  }));
}

module.exports = { logCall, getStats };