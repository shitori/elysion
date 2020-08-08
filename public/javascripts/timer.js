var timer = 10
var s = timer;
$("#timer").text(s);

$(function() {
    function timer(){
        s = s-1
        $("#timer").text(s);
    }
    setInterval(timer,1000);
});
setTimeout(function(){
    console.log("reload")
    window.location.reload(1);
}, timer * 1000);