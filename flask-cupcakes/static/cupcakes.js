const $cupcake_form = $("#cupcake-form");

$('.add-cupcake').click(deleteTodo)

let temp
async function deleteTodo(e) {
    e.preventdefault();
    temp = e;
}