const express = require('express');
const weatherRoute = require('./routes/weather');
const airRoute = require('./routes/air');
const busRoute = require('./routes/bus');
const tourismRoute = require('./routes/tourism');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/weather', weatherRoute);
app.use('/air', airRoute);
app.use('/bus', busRoute);
app.use('/tourism', tourismRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});