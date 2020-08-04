var j =2;
$(".ajouter").on("click", function () {
    j++;
    $(".joueurs").append("<div class=\"form-row joueur mb-1\">\n" +
        "        <label for=\"staticEmail\" class=\" form-control-lg col-sm-2 col-form-label\">Joueur n°"+j+"</label>\n" +
        "        <div class=\"col-8\">\n" +
        "            <input type=\"text\" class=\"form-control form-control-lg \" name=\"j"+j+"\" placeholder=\"Nom du joueur\" required>\n" +
        "        </div>\n" +
        "    </div>")
    console.log("joueur ajouté");
});

function show() {

    var x = document.getElementsByName("nom");

    console.log(x)
    if (x.type === "password") {
        console.log("1")
        x.type = "text";
    } else {
        console.log("2")
        x.type = "password";
    }
}