function login(){
  var email = $("input[name='uname']").val();
  var wachtwoord = $("input[name='pass']").val();
  if(!email || !wachtwoord){
    console.log("geen waardes");
  }
  else{
    FYSCloud.API.queryDatabase(
        "SELECT * FROM login Where email = ? AND wachtwoord =?",
        [email,wachtwoord]
    ).done(function (data) {
      //todo

    })
  }
}