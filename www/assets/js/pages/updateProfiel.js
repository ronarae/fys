//update de bio van de gebruiker
function overmijUpdate () {
    console.log("gewerkt");
    let bio = $("#bio").val();
    let interesses = getCheckedCheckboxes($('input.interesses_checkbox:checkbox:checked'));
    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET bio = ? WHERE gebruiker_id = ?",
        [bio, FYSCloud.Session.get('userId')]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
    let query = "DELETE FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?;INSERT INTO gebruiker_has_interesses (Gebruiker_gebruiker_id, Interesses_interesses_id) VALUES ";
    for (let i = 0; i < interesses.length; i++) {
      if ((i + 1) >= interesses.length) {
        query += "('" + FYSCloud.Session.get('userId') + "' , ?)";
      } else {
        query += "(" + FYSCloud.Session.get('userId') + ", ?), ";
      }
    FYSCloud.API.queryDatabase(
        query,
        [FYSCloud.Session.get('userId'), ...interesses]
    ).done(function(data) {
        console.log(data);
    }).fail(function(reason) {
        console.log(reason);
    });
    }
}


function accountgegevensUpdate() {
    console.log("working");
    let voornaam = $("#voornaam").val();
      let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
    let geslacht = $("#geslacht").val();
    let geboorte_datum = $("#geboortedatum").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ?, achternaam = ?, geslacht = ?, geboortedatum = ? WHERE gebruiker_id = ?",
        [voornaam,tussenvoegsel, achternaam, geslacht, geboorte_datum, FYSCloud.Session.get('userId')]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}