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


function Toggle() {
    var temp = document.getElementById("typepass");
    if (temp.type === "password") {
        temp.type = "text";
    }
    else {
        temp.type = "password";
    }
}