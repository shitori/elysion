var timer = 90
var s = timer;
var rater = 3;
var id_game = $("#id_game").val()
console.log(id_game)

$("#timer").text(s);
$("#essai").text(rater);

$(function () {
    function timer() {
        s--;
        $("#timer").text(s);
    }

    setInterval(timer, 1000);
});
setTimeout(function () {
    $.post("http://localhost:3000/game/" + id_game);

    window.location.reload(1);
}, timer * 1000);

$("#rater").click(function () {
    rater--;
    if (rater <= 0) {
        $("#rater").get(0).type = "submit";
    }
    $("#essai").text(rater);
});