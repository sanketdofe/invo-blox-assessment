const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../data/items.json');
const { mean } = require('../utils/stats');

let averagePrice = undefined;
let lastStoredTotalCount = 0;

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    const data = await fs.promises.readFile(DATA_PATH);
    const items = JSON.parse(raw);
    // Intentional heavy CPU calculation
    if (averagePrice === undefined || items.length !== lastStoredTotalCount) {
      averagePrice = mean(items.map(item => item.price));
      lastStoredTotalCount = items.length;
    }
    const stats = {
      total: lastStoredTotalCount,
      averagePrice: averagePrice,
    };

    res.json(stats);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;