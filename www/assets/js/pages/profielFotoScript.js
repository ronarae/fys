function profielFotoUpdate () {
        console.log("gewerkt");
        let profiel_foto = $("#profiel_foto").val();

        //de ingevoerde waardes worden in de database gezet
        FYSCloud.API.queryDatabase(
            "UPDATE gebruiker SET profiel_foto = ? WHERE gebruiker_id = ?",
            [profiel_foto, gebruiker_id]
        ).done(function(data) {
            console.log(data[0]);
        }).fail(function(reason) {
            console.log(reason);
        });
}