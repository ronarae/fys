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
      }).fail(function(reason) {
        console.log(reason);
      });
    })

  }).fail(function(reason) {
    console.log(reason);
  });


}


function accountgegevensUpdate() {
  console.log("working");
  let voornaam = $("#voornaam").val();
  let tussenvoegsel = $("#tussenvoegsel").val();
  let achternaam = $("#achternaam").val();
  let geslacht = $("#geslacht").val();
  let geboorte_datum = $("#geboortedatum").val();

  //de ingevoerde waardes worden in de database gezet
  FYSCloud.API.queryDatabase(
    "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ?, achternaam = ?, geslacht = ?, geboortedatum = ? WHERE gebruiker_id = ?",
    [voornaam, tussenvoegsel, achternaam, geslacht, geboorte_datum, FYSCloud.Session.get('userId')]
  ).done(function(data) {
    console.log(data[0]);
  }).fail(function(reason) {
    console.log(reason);
  });
}
