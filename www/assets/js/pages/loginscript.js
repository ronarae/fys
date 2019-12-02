FYSCloud.API.queryDatabase(
    "SELECT `login` FROM fys_is107_5_dev `Login` WHERE `email` = email AND `password` = wachtwoord"
).done(function(data) {
    FYSCloud.Session.set("loggedin", data.user_id);
}).fail(function(reason) {
    console.log(reason);
});
