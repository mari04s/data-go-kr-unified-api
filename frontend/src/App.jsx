import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function App() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const [lastRun, setLastRun] = useState([]);

  function loadStats() {
    return fetch(`${API_URL}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    loadStats().then(() => setLoading(false));
  }, []);

  async function callAllApis() {
    setCalling(true);
    try {
      const res = await fetch(`${API_URL}/call-all`);
      const data = await res.json();
      setLastRun(data);
      await loadStats();
    } catch (err) {
      console.error(err);
    }
    setCalling(false);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>API Reliability Panel</h1>

      <button onClick={callAllApis} disabled={calling} style={buttonStyle}>
        {calling ? 'Calling 6 APIs...' : 'Call all APIs'}
      </button>

      {lastRun.length > 0 && (
        <p>
          Last run:{' '}
          {lastRun.map((r) => (
            <span key={r.api} style={{ marginRight: '12px' }}>
              {r.api} {r.success ? '✅' : '❌'}
            </span>
          ))}
        </p>
      )}

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>API</th>
            <th style={cellStyle}>Total Calls</th>
            <th style={cellStyle}>Success Rate</th>
            <th style={cellStyle}>Avg Response Time</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.apiName}>
              <td style={cellStyle}>{s.apiName}</td>
              <td style={cellStyle}>{s.totalCalls}</td>
              <td style={cellStyle}>{s.successRate}%</td>
              <td style={cellStyle}>{s.avgResponseTime} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  margin: '1rem 0',
  cursor: 'pointer',
};

export default App;