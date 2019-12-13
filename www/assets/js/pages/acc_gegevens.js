//functie accGegevensUpdate
document.getElementById("opslaan").addEventListener("click", accGegevensUpdate);
function accGegevensUpdate() {
    console.log('update');
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
//    achternaam = encrypt(achternaam, salt);
    let geslacht = $("#geslacht").val();
    //de geboortedatum werkt niet goed moet nog gefixed worden
    let geboorte_datum = $("#geboorte_datum").val();
    let gebruiker_id = FYSCloud.Session.get("UserId");

    console.log(voornaam, achternaam, geslacht, geboorte_datum);
   //de ingevoerde waardes worden in de database gezet
       FYSCloud.API.queryDatabase(
           "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ? achternaam = ?, geslacht = ?, geboorte_datum = ?, WHERE gebruiker_id = ?",
           [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum,gebruiker_id]
       ).done(function(data) {
           //werkt nog niet
           console.log(data);
           FYSCloud.URL.redirect("profielpagina.html");
       }).fail(function(reason) {
           console.log(reason);
       });

}

