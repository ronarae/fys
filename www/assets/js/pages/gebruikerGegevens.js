//laad alle interesses en toont geselecteerde interesses van gebruiker
function laadAlleVelden(id, tabel) {
  let data_naam;
  let data_id;
  FYSCloud.API.queryDatabase(
    `SELECT * FROM interesses`
  ).done(function(data) {
    FYSCloud.API.queryDatabase(
        `SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?`,
        [FYSCloud.Session.get('userId')]
      ).done(function(more_data) {
      for (let i = 0; i < data.length; i++) {
        let equals = false;
        for (let j = 0; j < more_data.length; j++) {
          if (more_data[j].Interesses_interesses_id === data[i].interesses_id) {
            equals = true;
          }
        }
        if (equals) {
          $(id).append(`
            <label class="checkbox-inline">
              <input type="checkbox" class="interesses_checkbox" value="${data[i].interesses_id}" checked />
              <span class="badge">${data[i].interesse_naam}</span>
            </label>
            `);
        } else {
          $(id).append(`
            <label class="checkbox-inline">
              <input type="checkbox" class="interesses_checkbox" value="${data[i].interesses_id}" />
              <span class="badge">${data[i].interesse_naam}</span>
            </label>
            `);
        }
        if ((i % 5) === 0 && i != 0) {
          $(id).append(`<br>`);
        }
      }
    }).fail(function(reason) {
    console.log(reason);
  });
  }).fail(function(reason) {
    console.log(reason);
  });
}
//Laad bio van gebruiker
function laadBio() {
    let bio = $('#bio');
    FYSCloud.API.queryDatabase(
        "SELECT bio FROM gebruiker WHERE gebruiker_id = ?",
        [FYSCloud.Session.get('userId')]
    ).done(function(data) {
        bio.html(data[0].bio);
    }).fail(function(reason) {
        console.log(reason);
    });
}

function laadGebruikerGegevens() {
     let voornaam = $("#voornaam");
     let tussenvoegsel = $("#tussenvoegsel");
     let achternaam = $("#achternaam");
     let geslacht = $("#geslacht");
     let geboortedatum = $("#geboortedatum");
    FYSCloud.API.queryDatabase(
        "SELECT voornaam, tussenvoegsel, achternaam, geslacht, geboortedatum FROM gebruiker WHERE gebruiker_id = ?",
        [FYSCloud.Session.get('userId')]
    ).done(function(data) {
        voornaam.html(data[0].voornaam);
        tussenvoegsel.html(data[0].tussenvoegsel);
        achternaam.html(data[0].achternaam);
        geslacht.html(data[0].achternaam);
        geboortedatum.html(data[0].geboortedatum);
    }).fail(function(reason) {
        console.log(reason);
    });
}

includeDone(function() {
  laadAlleVelden('#interessesUpdate', 'interesses');
  laadBio();
  laadGebruikerGegevens();
});

// checkbox selector
function getCheckedCheckboxes(selector) {
  let elements = $(selector);
  let array = [];
  for (let i = 0; i < elements.length; i++) {
    array[i] = elements[i].value;
  }
  return array;
}


