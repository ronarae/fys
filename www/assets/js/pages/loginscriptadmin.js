function loginadmin(){
    console.log('login');
    const email = $("input[name='uname1']").val();
    const wachtwoord = $("input[name='pass1']").val();
    if(!email || !wachtwoord){
        console.log("geen waardes");
    }
    else {
        console.log('login');
        FYSCloud.API.queryDatabase(
            "SELECT * FROM gebruiker Where email = ? AND wachtwoord =? AND rechten_id =?",
            [email,wachtwoord,2]
        ).done(function (data) {
            if(data[0]){
                FYSCloud.Session.set("userId", data[0].gebruiker_id);
                FYSCloud.URL.redirect("adminpagina.html");
            }
            else{
                alert("wachtwoord en/of email is niet correct");
            }
        }).fail(reason => {
            console.log(reason);
        });
    }
}