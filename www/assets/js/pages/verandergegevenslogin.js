function verandergegevenslogin(){
    let email = $("#jouwemail").val();
    let wachtwoord = $("#wachtwoord").val();
    let herhaalwachtwoord = $("#herhaalwachtwoord").val();

    //de ingevoerde waardes worden in de database gezet
    if(wachtwoord !==herhaalwachtwoord){
        alert("wachtwoord komt niet overeen");
    }
    else {
        FYSCloud.API.queryDatabase(
            "UPDATE gebruiker SET  wachtwoord = ? WHERE email = ?",
            [wachtwoord, email]
        ).done(function (data) {
            console.log(data);
        }).fail(function (reason) {
            console.log(reason);
        });
    }
}