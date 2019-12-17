$(document).ready(function() {
  profielData();
});

function profielData() {
  let naam = $('#naam');
  let geboortedatum = $('#geboortedatum');
  let geslacht = $('#geslacht');
  let email = $('#email');
  let bio = $('#bio');
  let avatar = $('#avatar');
  let interesses = $('#interesses')
  FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE gebruiker_id = ?",
    [FYSCloud.Session.get('userId')]
  ).done(function(data) {
    d = data[0];
    naam.html(d.voornaam + " "+d.tussenvoegsel +" " + d.achternaam);
    geboortedatum.html(d.geboortedatum.replace("T00:00:00.000Z",""));
    geslacht.html(d.geslacht);
    email.html(d.email);
    bio.html(d.bio);
    avatar.attr('src', d.profiel_foto);

      FYSCloud.API.queryDatabase(
          "SELECT i.interesse_naam FROM gebruiker_has_interesses INNER JOIN Interesses i ON Interesses_interesses_id = i.interesses_id WHERE Gebruiker_gebruiker_id = ?",
          [FYSCloud.Session.get('userId')]
      ).done(function(data){
          console.log(data);
          for (let i = 0; i < data.length; i++) {
              interesses.append(`
                <p>${data[i].interesse_naam}</p>
              `);
          }

      }).fail(function(reason) {
          console.log(reason)
      });
  }).fail(function(reason) {
    console.log(reason);
  });

}
