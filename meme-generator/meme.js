const form = document.querySelector('form');
const display = document.getElementById('display');

document.addEventListener('DOMContentLoaded', function(e) {

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const img = document.createElement('img');
        const url = document.getElementById('url');

        // Check if user typed url or not. If user didn't, skip
        if(url.value !== '') {
            const top_text = document.createElement('div');
            const bot_text = document.createElement('div');
            const container = document.createElement('div');

            top_text.innerText = document.getElementById('text-top').value;
            bot_text.innerText = document.getElementById('text-bottom').value;

            top_text.setAttribute('class', 'top');
            bot_text.setAttribute('class', 'bottom');
            container.setAttribute('class', 'container');

            img.setAttribute('src', url.value);
            container.append(top_text, img, bot_text);
            display.append(container);
            url.value = '';
        }
    });



    // if user clicks the image, then remove it
    display.addEventListener('click', function(e) {
        let parent = e.target.parentNode;
        if(parent.classList.contains('container')) {
            parent.remove();
        }
    });
});
