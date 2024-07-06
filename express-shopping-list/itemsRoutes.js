const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('', (req, res) => {
  res.json(items);
});

router.post('', (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

router.get('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(foundItem);
});

router.patch('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    return res.status(404).json({ message: "Item not found" });
  }
  foundItem.name = req.body.name || foundItem.name;
  foundItem.price = req.body.price || foundItem.price;
  res.json({ updated: foundItem });
});

router.delete('/:name', (req, res) => {
  const itemIndex = items.findIndex(item => item.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  items.splice(itemIndex, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;