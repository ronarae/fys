function loginUpdate () {
    console.log("mn method werkt");
    let email = $("#email").val();
    let wachtwoord = $("#wachtwoord").val();



    //de ingevoerde waardes worden in de database gezet
    FYSCloud.API.queryDatabase(
        "UPDATE login SET email = ?, wachtwoord = ? WHERE gebruiker_id = ?",
        [email, wachtwoord, gebruiker_id]
    ).done(function(data) {
        console.log(data[0]);
    }).fail(function(reason) {
        console.log(reason);
    });
}