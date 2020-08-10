window.setInterval(function(){
    var id_game = $("#id_game").val()
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'http://localhost:3000/game/' + id_game + '/data',
        success: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}, 5000);

