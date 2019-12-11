$(document).ready(function() {
  profielData();
});

function profielData() {
  let naam = $('#naam');
  let geboortedatum = $('#geboortedatum');
  let geslacht = $('#geslacht');
  let email = $('#email');
  let bio = $('#bio')
  FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE gebruiker_id = ?",
    [FYSCloud.Session.get('userId')]
  ).done(function(data) {
    d = data[0];
    naam.html(d.voornaam + " " + d.achternaam);
    geboortedatum.html(d.geboortedatum);
    geslacht.html(d.geslacht);
    email.html(d.email);
    bio.html(d.bio);
  }).fail(function(reason) {
    console.log(reason);
  });
}
