$(document).ready(function() {
    profielData();
    Leeftijd();
});

function profielData() {
    if (!FYSCloud.URL.queryString('userId', false)) {
      laadProfiel(FYSCloud.Session.get('userId'));
    } else {
      laadProfiel(FYSCloud.URL.queryString('userId'));
      $('#editFotoIcon').html('');
      $('#editAccGegevens').html('');
      $('#editOverMij').html('');
    }
    loadVrienden();
}

function laadProfiel(userId) {
  let naam = $('#naam');
  let geslacht = $('#geslacht');
  let email = $('#email');
  let bio = $('#bio');
  let avatar = $('#avatar');
  let interesses = $('#interesses');
  FYSCloud.API.queryDatabase(
      "SELECT * FROM gebruiker WHERE gebruiker_id = ?",
      [userId]
  ).done(function(data) {
      d = data[0];
      naam.html(d.voornaam + " " + d.tussenvoegsel + " " + d.achternaam);
      geslacht.html(d.geslacht);
      email.html(d.email);
      bio.html(d.bio);
      avatar.attr('src', d.profiel_foto);


      FYSCloud.API.queryDatabase(
          "SELECT i.interesse_naam FROM gebruiker_has_interesses INNER JOIN Interesses i ON Interesses_interesses_id = i.interesses_id WHERE Gebruiker_gebruiker_id = ?", [FYSCloud.Session.get('userId')]
      ).done(function(data) {
          for (let i = 0; i < data.length; i++) {
              interesses.append(`
              <p class="space">${data[i].interesse_naam}</p>
            `);
          }

      }).fail(function(reason) {
          console.log(reason)
      });
  }).fail(function(reason) {
      console.log(reason);
  });
}

function loadVrienden() {
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker g WHERE g.gebruiker_id IN (SELECT v.Gebruiker_gebruiker_id FROM Vrienden v WHERE v.Vriend_user_id = ?) OR g.gebruiker_id IN (SELECT v.Vriend_user_id FROM Vrienden v WHERE v.Gebruiker_gebruiker_id = ?)",
        [FYSCloud.Session.get('userId'), FYSCloud.Session.get('userId')]
    ).done(data => {
        if (data.length > 0) {
          let matches = $('#matches');
          matches.html(`<table class='table table-striped'><thead></thead><tbody id='vriendTableBody'></tbody></table>`);
            for (user of data) {
              $('#vriendTableBody').append(`
                <tr title='Bekijk het profiel van ${user.voornaam} ${user.tussenvoegsel} ${user.achternaam}'>
                  <td onclick='openMatch(${user.gebruiker_id})'>${user.voornaam}</td>
                  <td onclick='openMatch(${user.gebruiker_id})'>${user.tussenvoegsel}</td>
                  <td onclick='openMatch(${user.gebruiker_id})'>${user.achternaam}</td>
                  <td><button class='btn btn-primary' onclick='openEmailModal(${user.gebruiker_id})'>Stuur Bericht</button></td>
                  <td><button class='btn btn-link text-danger' onclick='remove(${user.gebruiker_id})'>Verwijder Match</button></td>
                </tr>`);
            }
        }
    }).fail(reason => console.error(reason));
}

function openMatch(userId) {
  FYSCloud.URL.redirect('profielpagina.html', {
    userId: userId
  });
}

function remove(vriendId) {
    if (confirm('Weet u zeker dat u deze match wilt verwijderen?')) {
        FYSCloud.API.queryDatabase(
            "DELETE FROM vrienden WHERE (Gebruiker_gebruiker_id = ? AND Vriend_user_id = ?)  OR (Vriend_user_id = ? AND Gebruiker_gebruiker_id = ?)",
            [vriendId, FYSCloud.Session.get('userId'), vriendId, FYSCloud.Session.get('userId')]
        ).done(() => {
            $('#matches').html('<i>Je hebt nog geen match</i>');
            loadVrienden();
        }).fail(reason => console.error(reason));
    }
}

function Leeftijd() {

    let geboortedatum = $('#geboortedatum');

    FYSCloud.API.queryDatabase(
        "SELECT *, YEAR(CURDATE()) - YEAR(geboortedatum) AS leeftijd FROM gebruiker where gebruiker_id = ?;",
        [FYSCloud.Session.get('userId')]
    ).done(function(data) {
        d = data[0];
        geboortedatum.html(d.leeftijd);
        console.log(d);
    }).fail(function(reason) {
        console.log(reason);
    });

}

function openEmailModal(vriendId) {
  $('#sendEmailId').attr('onclick', `sendEmail(${vriendId})`);
  FYSCloud.API.queryDatabase(
    "SELECT voornaam, tussenvoegsel, achternaam FROM gebruiker WHERE gebruiker_id = ?",
    [vriendId]
  ).done(data => {
    $('#vriend_naam').html(data[0].voornaam + ' ' + data[0].tussenvoegsel + ' ' + data[0].achternaam);
    $("#emailModal").modal('show');
  }).fail(reason => console.error(reason));
}
