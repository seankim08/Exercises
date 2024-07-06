const express = require('express');
const app = express();

// Helper functions
function mean(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

function median(numbers) {
  const sorted = numbers.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mode(numbers) {
  const frequencyMap = {};
  let maxFrequency = 0;
  let modes = [];

  numbers.forEach(num => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
      modes = [num];
    } else if (frequencyMap[num] === maxFrequency) {
      modes.push(num);
    }
  });

  return modes.length === numbers.length ? [] : modes;
}

// Middleware to parse and validate numbers
function parseNumbers(req, res, next) {
  const { nums } = req.query;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required.' });
  }

  const numberStrings = nums.split(',');
  const numbers = [];
  for (let numStr of numberStrings) {
    const num = Number(numStr);
    if (isNaN(num)) {
      return res.status(400).json({ error: `${numStr} is not a number.` });
    }
    numbers.push(num);
  }

  req.numbers = numbers;
  next();
}

// Routes
app.get('/mean', parseNumbers, (req, res) => {
  const value = mean(req.numbers);
  res.json({ response: { operation: 'mean', value } });
});

app.get('/median', parseNumbers, (req, res) => {
  const value = median(req.numbers);
  res.json({ response: { operation: 'median', value } });
});

app.get('/mode', parseNumbers, (req, res) => {
  const value = mode(req.numbers);
  res.json({ response: { operation: 'mode', value } });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing