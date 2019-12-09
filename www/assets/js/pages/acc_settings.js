//profiel bewerken
function editProfile() {
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
    let geslacht = $("#geslacht").val();
    let geboorte_datum = $("#geboorte_datum").val();


    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker(voornaam, tussenvoegsel, achternaam, geslacht, geboortedatum) VALUES(?,?,?,?,?)",
        [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, avatar, bio]
    ).done(function (data) {
        console.log(data);
    }).fail(function (reason) {
        console.log(reason);
    });
}