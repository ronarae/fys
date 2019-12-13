//testdocument whatever
/*
document.getElementById("opslaan").addEventListener("click", bewerkprofiel);
function bewerkprofiel() {
    let voornaam = $("#voornaam").val();
    let tussenvoegsel = $("#tussenvoegsel").val();
    let achternaam = $("#achternaam").val();
    let geslacht = $("#geslacht").val();
    let geboortedatum = ("#geboortedatum").val();
    let userid = FYSCloud.Session.set("userId");
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker Where userid = ? AND voornaam = ? AND tussenvoegsel =? AND achternaam =? AND geslacht =? AND geboortedaum = ?",
        [userid,voornaam,tussenvoegsel,achternaam,geslacht,geboortedatum]
    ).done(function () {
        FYSCloud.URL.redirect("profielpagina.html");
    }).fail(reason => {
        console.log(reason);
    });
}
*/

