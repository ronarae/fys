//profiel bewerken
function editProfile() {
    //hier komt de variables

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "INSERT INTO gebruiker(voornaam, tussenvoegsel, achternaam, geslacht, geboortedatum, profiel_foto, bio) VALUES(?,?,?,?,?,?,?)",
        [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, avatar, bio]
    ).done(function (data) {
        console.log(data);
    }).fail(function (reason) {
        console.log(reason);
    });
}