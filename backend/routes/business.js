const express = require('express');
const router = express.Router();
const checkBusiness = require('../adapters/business');
const withLogging = require('../withLogging');

const loggedCheckBusiness = withLogging('business', checkBusiness);

router.get('/', async (req, res) => {
  const result = await loggedCheckBusiness('0000000000');
  res.json(result);
});

module.exports = router;