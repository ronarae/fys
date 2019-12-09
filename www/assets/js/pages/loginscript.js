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
      console.log(data);

    }).fail(reason => {
      console.log(reason);
    });
  }
}