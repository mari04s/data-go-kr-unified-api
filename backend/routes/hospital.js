const express = require('express');
const router = express.Router();
const getHospitalInfo = require('../adapters/hospital');
const withLogging = require('../withLogging');

const loggedGetHospitalInfo = withLogging('hospital', getHospitalInfo);

router.get('/', async (req, res) => {
  const result = await loggedGetHospitalInfo();
  res.json(result);
});

module.exports = router;