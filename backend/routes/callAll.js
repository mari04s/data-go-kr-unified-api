const express = require('express');
const router = express.Router();
const withLogging = require('../withLogging');

const getWeather = require('../adapters/weather');
const getAirQuality = require('../adapters/air');
const getBusArrival = require('../adapters/bus');
const getTourismInfo = require('../adapters/tourism');
const getHospitalInfo = require('../adapters/hospital');
const checkBusiness = require('../adapters/business');

const loggedBusiness = withLogging('business', checkBusiness);

const calls = [
  { name: 'weather', run: withLogging('weather', getWeather) },
  { name: 'air', run: withLogging('air', getAirQuality) },
  { name: 'bus', run: withLogging('bus', getBusArrival) },
  { name: 'tourism', run: withLogging('tourism', getTourismInfo) },
  { name: 'hospital', run: withLogging('hospital', getHospitalInfo) },
  { name: 'business', run: () => loggedBusiness('0000000000') },
];

router.get('/', async (req, res) => {
  const results = await Promise.all(
    calls.map(async (call) => {
      const result = await call.run();
      return { api: call.name, success: result.success, error: result.error };
    })
  );
  res.json(results);
});

module.exports = router;