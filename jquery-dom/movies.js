

$("#submit").on("click", function () {
    let title = $('#title').val();
    let rating = $('#rating').val();
    if (rating <= 10 && rating >= 0)
        $("ul").append("<li>" + title + ": " + rating + " " + "<button id='remove' class='btn btn-danger'>Remove</button></li>")
})

$("ul").on("click", "#remove", function () {
    $(this).parent().remove();
})