const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');
const airRoute = require('./routes/air');
const busRoute = require('./routes/bus');
const tourismRoute = require('./routes/tourism');
const hospitalRoute = require('./routes/hospital');
const businessRoute = require('./routes/business');
const statsRoute = require('./routes/stats');
const callAllRoute = require('./routes/callAll');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/weather', weatherRoute);
app.use('/air', airRoute);
app.use('/bus', busRoute);
app.use('/tourism', tourismRoute);
app.use('/hospital', hospitalRoute);
app.use('/business', businessRoute);
app.use('/stats', statsRoute);
app.use('/call-all', callAllRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});