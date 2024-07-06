let favNumb = 7;
let baseURL = "http://numbersapi.com";

// Part 1.
$.getJSON(`${baseURL}/${favNumb}?json`).then(result => {
  console.log(result);
});

// Part 2.
const favNumbs = [3, 81, 100];
$.getJSON(`${baseURL}/${favNumbs}?json`).then(result => {
  console.log(result);
});

// Part 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumb}?json`);
  })
).then(facts => {
  facts.forEach(result => $("body").append(`<p>${result.text}</p>`));
});
