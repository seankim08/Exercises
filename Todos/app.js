const submit = document.getElementById('submit');
const ul = document.querySelector('ul');
let saved_list = JSON.parse(localStorage.getItem("todo")) || [];


for(let i = 0; i < saved_list.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = saved_list[i].list;
    if(saved_list[i].done === true) {
        li.style.textDecoration = 'line-through';
    }
    ul.append(li);
}

document.addEventListener('DOMContentLoaded', function(event) {

    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const li = document.createElement('li');
        const remove = document.createElement('button');

        remove.classList.add('remove');
        remove.innerText = 'Remove'

        li.innerText = document.getElementById('input').value + ' ';
        li.append(remove)
        ul.append(li);
        document.getElementById('input').value = '';

        //store list into the localstorage
        saved_list.push({list : li.innerHTML, done : false});
        localStorage.setItem('todo', JSON.stringify(saved_list));
    });

    ul.addEventListener('click', function(e) {
        if(e.target.classList.contains('remove')) {
            const parent = e.target.parentNode;
            parent.remove();
            
            //filter out the removed list and then store newly updated list in the localstorage
            saved_list = saved_list.filter((todo) => todo.list !== parent.innerHTML)
            localStorage.setItem('todo', JSON.stringify(saved_list));
        };
    });

    ul.addEventListener('click', function(e) {
        let target = e.target;

        if(target.style.textDecoration === '') {
            target.style.textDecoration = 'line-through';
            saved_list.find((ele) => ele.list === target.innerHTML).done = true;
            console.log(target.innerHTML);
            localStorage.setItem('todo', JSON.stringify(saved_list));
        } else {
            target.style.textDecoration = '';
            saved_list.find((ele) => ele.list === target.innerHTML).done = false;
            localStorage.setItem('todo', JSON.stringify(saved_list));
        }
    });
})