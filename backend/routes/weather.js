const express = require('express');
const router = express.Router();
const getWeather = require('../adapters/weather');
const withLogging = require('../withLogging');

const loggedGetWeather = withLogging('weather', getWeather);

router.get('/', async (req, res) => {
  const result = await loggedGetWeather();
  res.json(result);
});

module.exports = router;