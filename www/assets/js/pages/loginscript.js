function login(){
  console.log('login');
  const email = $("input[name='uname']").val();
  const wachtwoord = $("input[name='pass']").val();
  if(!email || !wachtwoord){
    console.log("geen waardes");
  }
  else {
    console.log('login');
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker Where email = ? AND wachtwoord =?",
        [email,wachtwoord]
    ).done(function (data) {
       if(data[0]){
        FYSCloud.Session.set("userId", data[0].gebruiker_id);
        FYSCloud.URL.redirect("index.html");
      }
     else{
       alert("wachtwoord en/of email is niet correct");
      }
    }).fail(reason => {
      console.log(reason);
    });
  }
}