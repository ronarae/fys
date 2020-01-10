$(document).ready(function() {
    profielData();
    Leeftijd();
});

function profielData() {
    let naam = $('#naam');
    let geslacht = $('#geslacht');
    let email = $('#email');
    let bio = $('#bio');
    let avatar = $('#avatar');
    let interesses = $('#interesses')
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE gebruiker_id = ?", [FYSCloud.Session.get('userId')]
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
                <p>${data[i].interesse_naam}</p>
              `);
            }

        }).fail(function(reason) {
            console.log(reason)
        });
    }).fail(function(reason) {
        console.log(reason);
    });

    loadVrienden();

}

function loadVrienden() {
    FYSCloud.API.queryDatabase(
        "SELECT * FROM vrienden v INNER JOIN Gebruiker g ON g.gebruiker_id = v.Vriend_user_id WHERE v.Gebruiker_gebruiker_id = ?;SELECT * FROM vrienden v INNER JOIN Gebruiker g ON v.Gebruiker_gebruiker_id = g.gebruiker_id WHERE v.Vriend_user_id = ?", [FYSCloud.Session.get('userId'), FYSCloud.Session.get('userId')]
    ).done(data => {
        d = data[0].concat(data[1]);
        if (d.length > 0) {
            let vrienden = $('#matches');
            vrienden.html('');
            for (let i = 0; i < d.length; i++) {
                if (i % 2 === 0) {
                    vrienden.append(`
                    <tr style='background-color: #dddddd;'>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${d[i].voornaam}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${d[i].tussenvoegsel}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${d[i].achternaam}</td>
                        <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' onclick='remove(${d[i].vriend_id})'>Verwijder Match</button></td>
                    </tr>
                `);
                } else {
                    vrienden.append(`
                    <tr style='background-color: #FFFFFF'>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${d[i].voornaam}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${d[i].tussenvoegsel}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${d[i].achternaam}</td>
                        <td style='border: 1px solid #FFFFFF; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' onclick='remove(${d[i].vriend_id})'>Verwijder Match</button></td>
                    </tr>
                `);
                }
            }
        }
    }).fail(reason => console.error(reason));
}

function remove(vriendId) {
    if (confirm('Weet u zeker dat u deze match wilt verwijderen?')) {
        FYSCloud.API.queryDatabase(
            "DELETE FROM vrienden WHERE vriend_id = ?", [vriendId]
        ).done(() => {
            $('#matches').html('<i>Je hebt nog geen match</i>');
            loadVrienden();
        }).fail(reason => console.error(reason));
    }
}

function Leeftijd() {

    let geboortedatum = $('#geboortedatum');

    FYSCloud.API.queryDatabase(
        "SELECT *, YEAR(CURDATE()) - YEAR(geboortedatum) - IF(STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(geboortedatum), '-', DAY(geboortedatum)) ,'%Y-%c-%e') > CURDATE(), 1, 0) AS leeftijd FROM gebruiker where gebruiker_id = ?;",
        [FYSCloud.Session.get('userId')]
    ).done(function(data) {
        d = data[0];
        geboortedatum.html(d.leeftijd);
    }).fail(function(reason) {
        console.log(reason);
    });

}