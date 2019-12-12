function verwijderAcc() {
alert("Weet je zeker dat je het account wil verwijderen? Dit kan niet ongedaan worden!");

    let gebruiker_id = FYSCloud.Session.get("userId");

    console.log("working");
    //de gebruiker word verwijderd
    FYSCloud.API.queryDatabase(
        "DELETE FROM gebruiker WHERE gebruiker_id = ?",
        [gebruiker_id, FYSCloud.Session.get("userId")]
    ).done(function(data) {
        console.log(data[0]);
        FYSCloud.URL.redirect("index.html");
    }).fail(function(reason) {
        console.log(reason);
    });
    // FYSCloud.Session.remove("userId");
}