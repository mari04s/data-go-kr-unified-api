const express = require('express');
const router = express.Router();
const getTourismInfo = require('../adapters/tourism');
const withLogging = require('../withLogging');

const loggedGetTourismInfo = withLogging('tourism', getTourismInfo);

router.get('/', async (req, res) => {
  const result = await loggedGetTourismInfo();
  res.json(result);
});

module.exports = router;