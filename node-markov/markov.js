/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    this.chains = new Map();
    
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!this.chains.has(word)) {
        this.chains.set(word, []);
      }
      this.chains.get(word).push(nextWord);
    }
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let words = [];
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];

    while (words.length < numWords && currentWord !== null) {
      words.push(currentWord);
      let possibleNextWords = this.chains.get(currentWord);
      currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
    }

    return words.join(' ');
  }
}

module.exports = MarkovMachine;