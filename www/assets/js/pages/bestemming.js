
function bestemming() {
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker_has_bestemming INNER JOIN bestemming ON bestemming.bestemming_id = gebruiker_has_bestemming.Bestemming_bestemming_id WHERE Gebruiker_gebruiker_id=? ",
        [FYSCloud.Session.get("userId")]
    ).done(function(data) {
        console.log(data);
        let d;
        for (let i = 0; i < data.length; i++) {
            d = data[i];
            $('#bestemming-lijst').append(`
      <div class="col-4">
        <div class="bestemming">
          <div class="row">
            <div class="col-3">
            </div>
            <div class="col-9">
              <h3 class="text-uppercase">${d.bestemming_naam}</h3>
                <a href="#">
                <button class="btn btn-outline-secondary text-uppercase">meer informatie</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    `);
        }
    }).fail(function(reason) {
        console.log(reason);
    });
}