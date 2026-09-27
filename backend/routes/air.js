const express = require('express');
const router = express.Router();
const getAirQuality = require('../adapters/air');

router.get('/', async (req, res) => {
  const result = await getAirQuality();
  res.json(result);
});

module.exports = router;