/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

async function makeText(type, path) {
  try {
    let text;
    if (type === 'file') {
      text = fs.readFileSync(path, 'utf8');
    } else if (type === 'url') {
      let response = await axios.get(path);
      text = response.data;
    } else {
      throw new Error(`Unknown type: ${type}`);
    }
    generateText(text);
  } catch (err) {
    console.error(`Error reading ${path}: ${err.message}`);
    process.exit(1);
  }
}

let [type, path] = process.argv.slice(2);

if (type && path) {
  makeText(type, path);
} else {
  console.error('Usage: node makeText.js <file|url> <path>');
  process.exit(1);
}