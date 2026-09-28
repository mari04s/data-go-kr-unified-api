import { useState, useEffect } from 'react';

function App() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>API Reliability Panel</h1>
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

export default App;