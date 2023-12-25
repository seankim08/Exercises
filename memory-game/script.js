const gameContainer = document.getElementById("game");
const cur_score = document.getElementById('currentScore');
const best_score = document.getElementById('bestScore');
const start_btn = document.getElementById('start');

let score;
let lowest_score = localStorage.getItem('score') || [];

if(lowest_score !== null) {
  best_score.innerText = lowest_score;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let flippedCard = gameContainer.querySelectorAll('.flipped');

  if(flippedCard.length < 2 && !event.target.classList.contains('matched')) {
    event.target.style.backgroundColor = event.target.className; // add the color to the card
    event.target.classList.add('flipped');
  }

  flippedCard = gameContainer.querySelectorAll('.flipped');

  // skips any further action if all cards are flipped;
  if(gameContainer.querySelectorAll('.matched').length === COLORS.length) {
    ;
  }
  else if(flippedCard.length === 2) {

    //checks if the two flipped cards match
    if(flippedCard[0].style.backgroundColor === flippedCard[1].style.backgroundColor) {
      flippedCard[0].classList.replace('flipped', 'matched');
      flippedCard[1].classList.replace('flipped', 'matched');

      cur_score.innerText = ++score;
      //checks if card flipping is completed, if it did then compare the current score to the best score
      if(gameContainer.querySelectorAll('.matched').length === COLORS.length) {
        if(score < best_score.innerText || best_score.innerText === '') {
          localStorage.setItem('score', score);
          best_score.innerText = score;
        } 
      }
    }
    // if it does not match, the two cards stay for 1sec and then turn back
    else {
      flippedCard[0].classList.remove('flipped');
      flippedCard[1].classList.remove('flipped');
      cur_score.innerText = ++score;
      
      setTimeout(function() {
        flippedCard[0].style.backgroundColor = 'white';
        flippedCard[1].style.backgroundColor = 'white';
      }, 1000);
    }

  }

}

// when the DOM loads
//createDivsForColors(shuffledColors);

start_btn.addEventListener("click", function() {
  gameContainer.innerHTML = '';
  score = 0;
  cur_score.innerText = score;
  COLORS = [];
  generateColors(num_colors.value);
  createDivsForColors(shuffle(COLORS));
});

