const express = require('express');
const weatherRoute = require('./routes/weather');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/weather', weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});