const $guessForm = $("#guess-form");
const $timer = $("#timer")
const BASE_URL = 'http://localhost:5000';
let score = 0;
let tick = 60;
let answers = [];

$guessForm.on("submit", guess);

async function guess(evt) {
    evt.preventDefault();

    const guess = $("#guess-word").val();

    const response = await axios({
        url: `${BASE_URL}/guess`,
        method: "GET",
        params: { guess },
    });

    if (response.status === 200) {
        displayMsg(response.data['result']);
        if (response.data['result'] === 'ok') {
            await updateScore(guess);
        }
    }
};

function updateScore(val) {
    if (!answers.includes(val)) {
        score += val.length;
        answers.push(val);
        $("#score").text(score);
    }
};


function displayMsg(text) {
    if ($('#msg').val !== '') {
        $('#msg').remove();
    }
    $('body').append(`<span id="msg">The Guess is ${text}</sapn>`);
};

const timer = setInterval(updateTimer, 1000);

function updateTimer() {
    if (tick === 0) {
        clearInterval(timer);
        return;
    }

    tick--;
    $timer.text(tick)

};

async function endGame() {
    const button = document.getElementById("submit");
    button.disabled = true;

    const response = await axios.post(`${BASE_URL}/post_score`, { score })
}
