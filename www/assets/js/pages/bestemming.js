function bestemming() {
  FYSCloud.API.queryDatabase(
    "SELECT * FROM Gebruiker_has_bestemming gb INNER JOIN Bestemming b ON gb.Bestemming_bestemming_id = b.bestemming_id WHERE Gebruiker_gebruiker_id = ?",
    [FYSCloud.Session.get("userId")]
  ).done(function (data) {
    let lijst = $('#bestemming-lijst');
    lijst.html('');
    for (let i = 0; i < data.length; i++) {
      lijst.append(`
        <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top" src="${data[i].bestemming_afbeelding}" alt="${data[i].bestemming_naam}">
          <div class="card-body">
          <a href="${data[i].bestemming_link}" target="_blank">
          <h5 class="card-title">${data[i].bestemming_naam}</h5>
          </a>
          <button type='button' class="btn btn-danger mr-right"onclick='removeBestemming(${data[i].bestemming_id})'>-</button>
        </div>
      </div>
      `);
    }
  }).fail(function (reason) {
    console.log(reason);
    alert('OOPS! Something Went wrong')
  });
  FYSCloud.API.queryDatabase(
    "select * from bestemming b WHERE b.bestemming_id NOT IN (SELECT gb.bestemming_bestemming_id FROM gebruiker_has_bestemming gb WHERE gb.gebruiker_gebruiker_id = ?)",
    [FYSCloud.Session.get('userId')]
  ).done(data => {
    let lijst = $('#overige-bestemmingen');
    lijst.html('');
    for (let i = 0; i < data.length; i++) {
      lijst.append(`
        <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top" src="${data[i].bestemming_afbeelding}" alt="${data[i].bestemming_naam}">
          <div class="card-body">
            <a href="${data[i].bestemming_link}" target="_blank">
            <h5 class="card-title">${data[i].bestemming_naam}</h5>
            </a>
            <button type='button' class="btn btn-primary mr-right"onclick='addBestemming(${data[i].bestemming_id})'>+</button>
          </div>
      </div>
      `);
    }
  }).fail(reason => {
    console.error(reason)
    alert('OOPS! Something went wrong');
  });
}

function addBestemming(bestemmingId) {
  console.log(bestemmingId);
  FYSCloud.API.queryDatabase(
    "INSERT INTO gebruiker_has_bestemming (Gebruiker_gebruiker_id, Bestemming_bestemming_id) VALUES (?, ?)",
    [FYSCloud.Session.get('userId'), bestemmingId]
  ).done(data => {
    console.info(data);
    bestemming();
  }).fail(reason => console.error(reason));
}

function removeBestemming(bestemmingId) {
  console.log(bestemmingId);
  FYSCloud.API.queryDatabase(
    'DELETE FROM gebruiker_has_bestemming WHERE Gebruiker_gebruiker_id = ? AND Bestemming_bestemming_id = ?',
    [FYSCloud.Session.get('userId'), bestemmingId]
  ).done(data => {
    console.info(data);
    bestemming();
  }).fail(reason => console.error(reason));
}
