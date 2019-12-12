//functie accGegevensUpdate
function accGegevensUpdate() {
    console.log('update');
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
//    achternaam = encrypt(achternaam, salt);
    let geslacht = $("#geslacht").val();
    let geboorte_datum = $("#geboorte_datum").val();
    let gebruiker_id = FYSCloud.Session.get("UserId");

    console.log(voornaam, achternaam, geslacht, geboorte_datum);
   //de ingevoerde waardes worden in de database gezet
       FYSCloud.API.queryDatabase(
           "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ? achternaam = ?, geslacht = ?, geboorte_datum = ?, WHERE gebruiker_id = 2",
           [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum]
       ).done(function(data) {
           console.log(data);
       }).fail(function(reason) {
           console.log(reason);
       });

}

