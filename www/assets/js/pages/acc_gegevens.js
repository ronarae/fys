//functie accGegevensUpdate
function accGegevensUpdate() {
console.log("mn method werkt");
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
//    achternaam = encrypt(achternaam, salt);
    let geslacht = $("#geslacht").val();
    let geboorte_datum = $("#geboorte_datum").val();
    let gebruiker_id = $("#gebruiker_id").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET voornaam = ?, achternaam = ?, geslacht = ?, geboortedatum = ? WHERE gebruiker_id = ?",
        [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, gebruiker_id]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });

}
function Register() {
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
    // let salt = salt(32);
    // achternaam = encrypt(achternaam);




   //de ingevoerde waardes worden in de database gezet
       FYSCloud.API.queryDatabase(
           "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ? achternaam = ?, geslacht = ?, geboortedatum = ? WHERE gebruiker_id = ?",
           [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, gebruiker_id]
       ).done(function(data) {
           console.log(data);
       }).fail(function(reason) {
           console.log(reason);
       });
    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "INSERT INTO gebruiker(voornaam, tussenvoegsel, achternaam, geboortedatum, ) VALUES(?,?,?,?,?,?,?,?,?)",
        [voornaam, tussenvoegsel, achternaam, email, wachtwoord,  geslacht, geboorte_datum, avatar, bio]
    ).done(function(data) {
        console.log(data);
    }).fail(function(reason) {
        console.log(reason);
    });
}