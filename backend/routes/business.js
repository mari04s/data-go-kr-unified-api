const express = require('express');
const router = express.Router();
const checkBusiness = require('../adapters/business');

router.get('/', async (req, res) => {
  const result = await checkBusiness('0000000000'); // test number for now
  res.json(result);
});

module.exports = router;