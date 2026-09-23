const express = require('express');
const router = express.Router();
const getWeather = require('../adapters/weather');

router.get('/', async (req, res) => {
  const result = await getWeather();
  res.json(result);
});

module.exports = router;