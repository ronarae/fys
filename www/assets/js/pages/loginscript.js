function login() {
  console.log('login');
  FYSCloud.API.queryDatabase(
    "SELECT * FROM fys_is107_5_dev.login WHERE `email` = 'email' AND `password` = 'wachtwoord'"
  ).done(function(data) {
    FYSCloud.Session.set("loggedin", data.user_id);
  }).fail(function(reason) {
    console.log(reason);
  });
}

$('#login').submit(function(e) {
  alert();
});
