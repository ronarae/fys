function loginUpdate () {
    console.log("mn method werkt");
    let email = $("#email").val();
    let wachtwoord = $("#wachtwoord").val();
    let herhaalwachtwoord = $("#herhaal_wachtwoord").val();


    //de ingevoerde waardes worden in de database gezet
    if(wachtwoord !==herhaalwachtwoord){
        alert("wachtwoord komt niet overeen");
    }
    else {
        FYSCloud.API.queryDatabase(
            "UPDATE gebruiker SET email = ?, wachtwoord = ? WHERE gebruiker_id = ?",
            [email, wachtwoord, FYSCloud.Session.get('userId')]
        ).done(function (data) {
            console.log(data[0]);
            FYSCloud.URL.redirect("profielpagina.html");
        }).fail(function (reason) {
            console.log(reason);
        });
    }
}