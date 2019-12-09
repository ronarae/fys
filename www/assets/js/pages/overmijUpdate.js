function overmijUpdate () {
    console.log("gewerkt");
    let bio = $("#bio").val();

    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET bio = ? WHERE gebruiker_id = ?",
        [bio, gebruiker_id]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}