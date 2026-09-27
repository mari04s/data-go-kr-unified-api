const express = require('express');
const router = express.Router();
const getBusArrival = require('../adapters/bus');
const withLogging = require('../withLogging');

const loggedGetBusArrival = withLogging('bus', getBusArrival);

router.get('/', async (req, res) => {
  const result = await loggedGetBusArrival();
  res.json(result);
});

module.exports = router;