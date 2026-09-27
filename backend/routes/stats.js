const express = require('express');
const router = express.Router();
const { getStats } = require('../db');

router.get('/', (req, res) => {
  res.json(getStats());
});

module.exports = router;