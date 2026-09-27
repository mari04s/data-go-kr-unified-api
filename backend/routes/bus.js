const express = require('express');
const router = express.Router();
const getBusArrival = require('../adapters/bus');

router.get('/', async (req, res) => {
  const result = await getBusArrival();
  res.json(result);
});

module.exports = router;