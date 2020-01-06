if (userId = FYSCloud.URL.queryString('userId', false)) {
    includeDone(() => {
        n = $('#naam');
        gd = $('#geboortedatum');
        g = $('#geslacht');
        e = $('#email');
        b = $('#bio');
        p = $('#avatar');
        FYSCloud.API.queryDatabase(
            "SELECT * FROM gebruiker WHERE gebruiker_id = ?", [userId]
        ).done(data => {
            if (data.length > 0) {
                d = data[0];
                n.html(d.voornaam + ' ' + d.achternaam);
                gd.html(d.geboortedatum.split('T')[0]);
                g.html(d.geslacht);
                e.html(d.email);
                b.html(d.bio);
                p.attr('src', d.profiel_foto);
                getCheckBoxesFromTable('#interesses', userId, 'interesses');
            } else {
                alert('Gebruiker bestaat niet.');
                FYSCloud.URL.redirect('zoekeenmatch.html')
            }
        }).fail(reason => {
            alert('Er ging iets mis met het laden van de data, probeer het alstublieft later opnieuw');
            FYSCloud.URL.redirect('zoekeenmatch.html');
        })
    });
} else {
    alert('Er ging iets mis, probeer het alstublieft opnieuw');
    FYSCloud.URL.redirect('index.html');
}

function match() {
    FYSCloud.API.queryDatabase(
        "INSERT INTO Vrienden (Gebruiker_gebruiker_id, Vriend_user_id) VALUES (?, ?)", [FYSCloud.Session.get('userId'), FYSCloud.URL.queryString('userId')]
    ).done(data => {
        console.info(data);
        FYSCloud.URL.redirect('profielpagina.html');
    }).fail(reason => console.error(reason));
}