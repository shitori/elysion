window.setInterval(function () {
    var id_game = $("#id_game").val()
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/game/' + id_game + '/data',
        success: function (data) {
            var players = "";
            var history = "";
            for (i in data.players) {
                if (data.players[i].id == data.game.p1) {
                    var j1 = data.players[i].name
                }
                if (data.players[i].id == data.game.p2) {
                    var j2 = data.players[i].name
                }
                //players += "<li>" + data.players[i].name + " : " + data.players[i].score + " </li>";
                var k = i;
                k++;
                if (i < data.players.length / 3) {
                    players += "<li class=\"list-group-item bg-dark text-success h3\">" + k + "e: " + data.players[i].name + " avec un score de " + data.players[i].score + "</li>"

                } else if (i < data.players.length * 2 / 3) {
                    players += "<li class=\"list-group-item bg-dark text-warning h3\">" + k + "e: " + data.players[i].name + " avec un score de " + data.players[i].score + "</li>"

                } else {
                    players += "<li class=\"list-group-item bg-dark text-danger h3\">" + k + "e: " + data.players[i].name + " avec un score de " + data.players[i].score + "</li>"
                }
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
                /*console.log(data.history[i])
                console.log(data.history[i].isSuccess.data[0])*/
                if (data.history[i].isSuccess.data[0] == 49) {
                    history +=
                        "<div class=\"card bg-dark m-4 border border-success\" style=\"width: 18rem;\">" +
                        "<div class=\"card-body\"><h5 class=\"card-title\">" +
                        data.history[i].j1 +
                        " → "
                        + data.history[i].j2 +
                        "</h5><h4 class=\"card-text\">"
                        + data.history[i].actualword +
                        "</h4></div></div>"
                } else {
                    history +=
                        "<div class=\"card bg-dark m-4 border border-danger\" style=\"width: 18rem;\">" +
                        "<div class=\"card-body\"><h5 class=\"card-title\">" +
                        data.history[i].j1 +
                        " → "
                        + data.history[i].j2 +
                        "</h5><h4 class=\"card-text\">"
                        + data.history[i].actualword +
                        "</h4></div></div>"
                }
            }
            $("#j1").text(j1)
            $("#j2").text(j2)
            $(".players").html(players)
            $(".history").html(history)

        }
    });
}, 5000);

