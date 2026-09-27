const express = require('express');
const router = express.Router();
const getTourismInfo = require('../adapters/tourism');

router.get('/', async (req, res) => {
  const result = await getTourismInfo();
  res.json(result);
});

module.exports = router;