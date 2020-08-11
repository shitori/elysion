window.setInterval(function () {
    var id_game = $("#id_game").val()
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'http://localhost:3000/game/' + id_game + '/data',
        success: function (data) {
            var players = "";
            var history = "";
            for (i in data.players) {
                if (data.players[i].id == data.game.p1){
                    var j1 = data.players[i].name
                }
                if (data.players[i].id == data.game.p2){
                    var j2 = data.players[i].name
                }
                players += "<li>" + data.players[i].name + " : " + data.players[i].score + " </li>";
            }
            for (i in data.history) {
                for (j in data.players) {
                    if (data.history[i].p1 == data.players[j].id) {
                        data.history[i].j1 = data.players[j].name
                    }
                    if (data.history[i].p2 == data.players[j].id) {
                        data.history[i].j2 = data.players[j].name
                    }
                }
                console.log(data.history[i])
                console.log(data.history[i].isSuccess.data[0])
                if (data.history[i].isSuccess.data[0] == 49) {
                    history += "<li>" +
                        data.history[i].j1 +
                        " a reussi a faire deviner le mot " +
                        data.history[i].actualword +
                        " à " +
                        data.history[i].j2 +
                        "</li>"
                } else {
                    history += "<li>" +
                        data.history[i].j1 +
                        " n'a pas reussi a faire deviner le mot " +
                        data.history[i].actualword +
                        " à " +
                        data.history[i].j2 +
                        "</li>"
                }
            }
            $("#j1").text(j1)
            $("#j2").text(j2)
            $(".players").html(players)
            $(".history").html(history)

        }
    });
}, 5000);

