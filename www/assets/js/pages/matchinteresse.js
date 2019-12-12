const gebruikerData = [];
const gebruikerInteresses = [];
let calculated = false;

function match() {
  FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?",
    [FYSCloud.Session.get('userId')]
  ).done(function(data) {
    for (let i = 0; i < data.length; i++) {
      gebruikerInteresses.push(data[i].Interesses_interesses_id);
    }
    FYSCloud.API.queryDatabase(
      "SELECT * FROM Gebruiker WHERE gebruiker_id <> ?",
      [FYSCloud.Session.get('userId')]
    ).done(function(data) {
      for (let i = 0; i < data.length; i++) {
        gebruikerData.push(data[i]);
        gebruikerData[i].geboortedatum = gebruikerData[i].geboortedatum.split('T')[0];
        FYSCloud.API.queryDatabase(
          "SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?",
          [data[i].gebruiker_id]
        ).done(function(data) {
          gebruikerData[i].interesses = [];
          for (let j = 0; j < data.length; j++) {
            gebruikerData[i].interesses.push(data[j].Interesses_interesses_id);
          }
          gebruikerData[i].matches = compareArray(gebruikerInteresses, gebruikerData[i].interesses);
          gebruikerData.sort(sortByMatches);
          calculated = true;
        }).fail(function(reason) {
          console.log(reason);
        });
      }
    }).fail(function(reason) {
      console.log(reason);
    });
  }).fail(function(reason) {
    console.log(reason);
  });
}

function compareArray(array1, array2) {
  let equals = 0;
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        equals++;
      }
    }
  }
  return (Math.floor(equals / ((array1.length + array2.length) / 2) * 100));
}

function sortByMatches(a, b) {
  const matchA = a.matches;
  const matchB = b.matches;

  let comparison = 0;
  if (matchA > matchB) {
    comparison = -1;
  } else if (matchA < matchB) {
    comparison = 1;
  }
  return comparison;
}

includeLoaded(function() {
  showData();
});

function showData() {
  let d;
  for (let i = 0; i < gebruikerData.length; i++) {
    d = gebruikerData[i];
    $('#match-list').append(`
      <div class="col-4">
        <div class="match">
          <div class="row">
            <div class="col-3">
              <i class="fas fa-user-circle matchPic"></i>
            </div>
            <div class="col-9">
              <li class="text-uppercase">${d.voornaam} ${d.achternaam}</li>
              <li class="text-uppercase">${d.geboortedatum}</li>
              <li class="text-uppercase">${d.matches}% match</li>
              <li class="text-uppercase">
                <a href="profile-match.html">
                <button class="btn btn-outline-secondary text-uppercase">match</button>
              </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    `);
  }
}

function includeLoaded(callback) {
  let interval = setInterval(function() {
    if (calculated) {
      clearInterval(interval);
      callback();
    }
  }, 500)
}

includeDone(function() {
  match();
});
