function bestemming() {
  FYSCloud.API.queryDatabase(
    "SELECT * FROM Gebruiker_has_bestemming gb INNER JOIN Bestemming b ON gb.Bestemming_bestemming_id = b.bestemming_id WHERE Gebruiker_gebruiker_id = ?",
    [FYSCloud.Session.get("userId")]
  ).done(function (data) {
    let lijst = $('#bestemming-lijst');
    for (let i = 0; i < data.length; i++) {
      lijst.append(`
        <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top" src="${data[i].bestemming_afbeelding}" alt="${data[i].bestemming_naam}">
          <div class="card-body">
          <h5 class="card-title">${data[i].bestemming_naam}</h5>
        </div>
      </div>
      `);
    }
  }).fail(function (reason) {
    console.log(reason);
  });
}