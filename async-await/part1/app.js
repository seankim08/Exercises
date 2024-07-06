let favNumb = 7;
let baseURL = "http://numbersapi.com";

// Part 1.
async function favNumber() {
  let result = await $.getJSON(`${baseURL}/${favNumb}?json`);
  console.log(result);
}
favNumber();

// Part 2.
const favNumbs = [3, 81, 100];
async function favNumbers() {
  let result = await $.getJSON(`${baseURL}/${favNumbs}?json`);
  console.log(result);
}
favNumbers();

// Part 3.
async function fact() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumb}?json`))
  );
  facts.forEach(result => {
    $('body').append(`<p>${result.text}</p>`);
  });
}
fact();
