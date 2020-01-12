let userData = [];
let gebruikerInteresses = [];
let calculated = false;

function match() {
  FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id =?",
    [FYSCloud.Session.get('userId')]
  ).done(data => {
    gebruikerInteresses = [...data.map(obj => obj.Interesses_interesses_id)];
    let userId = FYSCloud.Session.get('userId');
    FYSCloud.API.queryDatabase(
      "SELECT * FROM gebruiker WHERE gebruiker_id <> ? AND  (NOT gebruiker_id IN (SELECT Vriend_user_id FROM Vrienden WHERE Gebruiker_gebruiker_id = ?) OR gebruiker_id IN (SELECT Gebruiker_gebruiker_id FROM Vrienden WHERE Vriend_user_id = ?))",
      [userId, userId, userId]
    ).done(data => {
      userData = [...data];
      FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker_has_interesses WHERE gebruiker_gebruiker_id <> ? AND (NOT gebruiker_gebruiker_id IN (SELECT Vriend_user_id FROM Vrienden WHERE Gebruiker_gebruiker_id = ?) OR gebruiker_gebruiker_id IN (SELECT Gebruiker_gebruiker_id FROM Vrienden WHERE Vriend_user_id = ?))",
        [userId, userId, userId]
      ).done(data => {
        let ud;
        let ui;
        for (let i = 0; i < userData.length; i++) {
          ud = userData[i];
          ui = data.filter(obj => obj.Gebruiker_gebruiker_id === ud.gebruiker_id);
          ud.interesse_match = compareArray(gebruikerInteresses, ui.map(obj => obj.Interesses_interesses_id));
          ud.leeftijd = calculate_age(new Date(ud.geboortedatum));
        }
        FYSCloud.API.queryDatabase(
          "SELECT * FROM gebruiker_has_bestemming WHERE gebruiker_gebruiker_id <> ? AND (NOT gebruiker_gebruiker_id IN (SELECT Vriend_user_id FROM Vrienden WHERE Gebruiker_gebruiker_id = ?) OR gebruiker_gebruiker_id IN (SELECT Gebruiker_gebruiker_id FROM Vrienden WHERE Vriend_user_id = ?))",
          [userId, userId, userId]
        ).done(data => {
          let ud;
          let ub;
          for (let i = 0; i < userData.length; i++) {
            ud = userData[i];
            ub = data.filter(obj => obj.Gebruiker_gebruiker_id === ud.gebruiker_id);
            ud.bestemming_match = compareArray(gebruikerInteresses, ub.map(obj => obj.Bestemming_bestemming_id));
            ud.matches = Math.floor((ud.interesse_match + ud.bestemming_match) / 2);
          }
          showData();
        }).fail(reason => console.error(reason));
      }).fail(reason => console.error(reason));
    }).fail(reason => console.error(reason));
  }).fail(reason => console.error(reason));
}

// function match() {
//     FYSCloud.API.queryDatabase(
//         "SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?", [FYSCloud.Session.get('userId')]
//     ).done(function(data) {
//         for (let i = 0; i < data.length; i++) {
//             gebruikerInteresses.push(data[i].Interesses_interesses_id);
//         }
//         userId = FYSCloud.Session.get('userId');
//         FYSCloud.API.queryDatabase(
//             "SELECT * FROM Gebruiker WHERE gebruiker_id <> ?; SELECT * FROM Vrienden WHERE Gebruiker_gebruiker_id = ?; SELECT * FROM Vrienden WHERE Vriend_user_id = ?", [userId, userId, userId]
//         ).done(function(data) {
//             data = removeDoubles(data);
//             for (let i = 0; i < data.length; i++) {
//                 gebruikerData.push(data[i]);
//                 gebruikerData[i].leeftijd = calculate_age(new Date(gebruikerData[i].geboortedatum));
//                 FYSCloud.API.queryDatabase(
//                     "SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?", [data[i].gebruiker_id]
//                 ).done(function(data) {
//                     gebruikerData[i].interesses = [];
//                     for (let j = 0; j < data.length; j++) {
//                         gebruikerData[i].interesses.push(data[j].Interesses_interesses_id);
//                     }
//                     gebruikerData[i].matches = compareArray(gebruikerInteresses, gebruikerData[i].interesses);
//                     calculated = true;
//                     console.log()
//                 }).fail(function(reason) {
//                     console.log(reason);
//                 });
//             }
//         }).fail(function(reason) {
//             console.log(reason);
//         });
//     }).fail(function(reason) {
//         console.log(reason);
//     });
// }

// function removeDoubles(array) {
//     for (let i = 0; i < array[0].length; i++) {
//         for (let j = 0; j < array[1].length; j++) {
//             if (array[0][i].gebruiker_id === array[1][j].vriend_user_id) {
//                 array[0].splice(i, 1);
//             }
//         }
//         for (let j = 0; j < array[2].length; j++) {
//             if (array[0][i].gebruiker_id === array[2][j].Gebruiker_gebruiker_id) {
//                 array[0].splice(i, 1);
//             }
//         }
//     }
//     return array[0];
// }

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

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function showData() {
    let d;
    // for (let i = 0; i < userData.length; i++) {
    //     if (isNaN(gebruikerData[i].matches)) {
    //         userData.splice(i);
    //     }
    // }
    userData.sort(sortByMatches);
    for (let i = 0; i < userData.length; i++) {
        d = userData[i];
        $('#match-list').append(`
      <div class="col-4">
        <div class="match">
          <div class="row">
            <div class="col-12 text-center">
              <li class="text-uppercase">${d.voornaam} ${d.achternaam}</li>
              <li class="text-uppercase">${d.leeftijd} Jaar</li>
              <li class="text-uppercase">${d.matches}% match</li>
              <li class="text-uppercase">
                <button class="btn btn-outline-secondary text-uppercase" onclick='goToUser(${d.gebruiker_id})' title='Interesse match: ${d.interesse_match}%,\nBestemming match: ${d.bestemming_match}%'>Show Gebruiker</button>
              </li>
            </div>
          </div>
        </div>
      </div>
    `);
    }
}

function goToUser(userId) {
    FYSCloud.URL.redirect('profile-match.html', {
        userId: userId
    });
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
