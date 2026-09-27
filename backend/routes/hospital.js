const express = require('express');
const router = express.Router();
const getHospitalInfo = require('../adapters/hospital');

router.get('/', async (req, res) => {
  const result = await getHospitalInfo();
  res.json(result);
});

module.exports = router;