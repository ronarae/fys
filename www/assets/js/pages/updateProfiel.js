$(document).ready(function() {
    overmijUpdate();
    profielfotoUpdate();
});

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

function profielfotoUpdate() {
    console.log("gewerkt");
    let profiel_foto = $("#profiel_foto").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET bio = ? WHERE gebruiker_id = ?",
        [profiel_foto, FYSCloud.Session.get('userId')]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}