const express = require('express');
const router = express.Router();
const getAirQuality = require('../adapters/air');
const withLogging = require('../withLogging');

const loggedGetAirQuality = withLogging('air', getAirQuality);

router.get('/', async (req, res) => {
  const result = await loggedGetAirQuality();
  res.json(result);
});

module.exports = router;