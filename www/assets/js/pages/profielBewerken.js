//update de bio en interesses van de gebruiker
function overmijUpdate() {
  let bio = $("#bio").val();
  let interesses = getCheckedCheckboxes($('input.interesses_checkbox:checkbox:checked'));
  //de ingevoerde waardes worden in de database gezet
  FYSCloud.API.queryDatabase(
    "UPDATE gebruiker SET bio = ? WHERE gebruiker_id = ?",
    [bio, FYSCloud.Session.get('userId')]
  ).done(function() {
    FYSCloud.API.queryDatabase("DELETE FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?", [FYSCloud.Session.get('userId')]).done(function(data) {
      let query = "INSERT INTO gebruiker_has_interesses (Gebruiker_gebruiker_id, Interesses_interesses_id) VALUES ";
      for (let i = 0; i < interesses.length; i++) {
        if ((i + 1) >= interesses.length) {
          query += "('" + FYSCloud.Session.get('userId') + "' , ?)";
        } else {
          query += "(" + FYSCloud.Session.get('userId') + ", ?), ";
        }
      }
      FYSCloud.API.queryDatabase(
        query,
        interesses
      ).done(function(data) {
        console.log(data);
          alert("Gelukt!!");
      }).fail(function(reason) {
        console.log(reason);
          alert("Probeer het nog één keer, niet alles ingevuld");
      });
    })

  }).fail(function(reason) {
    console.log(reason);
      alert("Probeer het nog één keer, niet alles ingevuld");
  });

}
//Update de accountgegevens van de gebruiker
function accountgegevensUpdate() {
  console.log("working");
  let voornaam = $("#voornaam").val();
  let tussenvoegsel = $("#tussenvoegsel").val();
  let achternaam = $("#achternaam").val();
  let geslacht = $("#geslacht").val();
  let geboortedatum = $("#geboortedatum").val();

  //de ingevoerde waardes worden in de database gezet
  FYSCloud.API.queryDatabase(
    "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ?, achternaam = ?, geslacht = ?, geboortedatum = ? WHERE gebruiker_id = ?",
    [voornaam, tussenvoegsel, achternaam, geslacht, geboortedatum, FYSCloud.Session.get('userId')]
  ).done(function(data) {
    console.log(data[0]);
      alert("Gelukt!!");
  }).fail(function(reason) {
    console.log(reason);
      alert("Probeer het nog één keer, niet alles is ingevuld");
  });
}

// Verwijdert account
function verwijderAcc() {
alert("Weet je zeker dat je het account wil verwijderen? Dit kan niet ongedaan worden!");

    let gebruiker_id = FYSCloud.Session.get("userId");

    console.log("working");
    //de gebruiker word verwijderd
    FYSCloud.API.queryDatabase(
        "DELETE FROM gebruiker WHERE gebruiker_id = ?",
        [gebruiker_id, FYSCloud.Session.get("userId")]
    ).done(function(data) {
        console.log(data[0]);
        FYSCloud.URL.redirect("index.html");
        FYSCloud.Session.remove("userId");
        alert('Jouw account is verwijderd');
    }).fail(function(reason) {
        console.log(reason);
        alert('Jouw account is nog NIET vewijderd');
    });
    //
}
