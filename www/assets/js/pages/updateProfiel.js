//update de bio van de gebruiker
function overmijUpdate () {
    console.log("gewerkt");
    let bio = $("#bio").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET bio = ? WHERE gebruiker_id = ?",
        [bio, FYSCloud.Session.get('userId')]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}

function accountgegevensUpdate() {
    console.log("working");
    let voornaam = $("#voornaam").val();
    //  let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
    let geslacht = $("#geslacht").val();
    //let geboorte_datum = $("#geboortedatum").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET voornaam = ?, achternaam = ?, geslacht = ? WHERE gebruiker_id = ?",
        [voornaam, achternaam, geslacht, FYSCloud.Session.get('userId')]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}