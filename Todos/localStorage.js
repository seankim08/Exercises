/* //const submit = document.getElementById('submit');
//const ul = document.querySelector('ul');
const saved_list = JSON.parse(localStorage.getItem("list")) || [];

if(saved_list !== null) {
for(let i = 0; i < saved_list.length; i++) {
    let li = document.querySelector('li');
    li.innerText = saved_list[i].task;
    if(saved_list[i].isCompleted) {
        li.style.textDecoration = 'line-through';
    }
    ul.append(li);
}}

submit.addEventListener('click', function(e) {
    e.preventDefault();
    const li = document.getElementById('input').value;
    saved_list.push({task:li, isCompleted:false});
    localStorage.setItem('list', JSON.stringify(saved_list));
})

ul.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = e.target.parentNode;
    if(e.target.className === 'done') {
        console.log(parent.innerText);
        saved_list.find(function(){return parent.innerText}).isCompleted = true;
    } 
    else if(e.target.className === 'remove') {
       //saved_list.find(function(){return parent.innerText}).....
    }
}) */