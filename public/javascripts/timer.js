var timer = 90
var s = timer;
var rater = 3;

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
    window.location.reload(1);
}, timer * 1000);

$("#rater").click(function () {
    rater--;
    if (rater <= 0) {
        window.location.reload(1);
    }
    $("#essai").text(rater);
});