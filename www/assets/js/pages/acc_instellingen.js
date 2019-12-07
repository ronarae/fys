function verwijderAcc() {
alert("Weet je zeker dat je het account wil verwijderen? Dit kan niet ongedaan worden!");
window.location="index.html";
}

function accGegevensUpdate() {
console.log("mn method werkt");
    let voornaam = $("#voornaam").val();
//    let tussenvoegsel = $("#tussenvoegsel").val();
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