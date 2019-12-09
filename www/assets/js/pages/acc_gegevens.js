//functie accGegevensUpdate
function accGegevensUpdate() {
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
//    achternaam = encrypt(achternaam, salt);
    let geslacht = $("#geslacht").val();
    let geboorte_datum = $("#geboorte_datum").val();
    let gebruiker_id = fyscloud.session.get("userId")


   //de ingevoerde waardes worden in de database gezet
       FYSCloud.API.queryDatabase(
           "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ? achternaam = ?, geslacht = ?, geboorte_datum = ?, WHERE gebruiker_id = ?",
           [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, gebruiker_id]
       ).done(function(data) {
           console.log(data);
       }).fail(function(reason) {
           console.log(reason);
       });

}