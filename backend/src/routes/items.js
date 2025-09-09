const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// Utility to read data (intentionally sync to highlight blocking issue)
async function readData() {
  const raw = await fs.promises.readFile(DATA_PATH);
  return JSON.parse(raw);
}

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const data = await readData();
    const { limit, q } = req.query;
    let results = data;

    if (q) {
      // Simple substring search (sub‑optimal)
      const lowerCasedQuery = q.toString().toLowerCase();
      results = results.filter(item => item.name.toLowerCase().includes(lowerCasedQuery));
    }

    if (limit !== undefined) {
      const parsed = Number(limit);
      if (Number.isInteger(parsed) && parsed > 0) {
        results = results.slice(0, parsed);
      }
    }
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    // TODO: Validate payload (intentional omission)
    const item = req.body;
    if (typeof item !== 'object') {
      res.status(400).json({
        message: "Invalid payload"
      });
      return;
    }
    if (!item.name || typeof item.name !== "string") {
      res.status(400).json({
        message: "name must be string"
      });
      return;
    }
    if (!item.category || typeof item.category !== "string") {
      res.status(400).json({
        message: "category must be string"
      });
      return;
    }
    if (!item.price || typeof item.price !== "number") {
      res.status(400).json({
        message: "price must be number"
      });
      return;
    }
    const data = await readData();
    item.id = Date.now();
    data.push(item);
    await fs.promises.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;