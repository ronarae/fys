function profielFotoUpdate() {

    let avatar = $("#profiel_foto");
    //de ingevoerde waardes worden in de database gezet
    FYSCloud.Utils
        .getDataUrl(avatar)
        .done(function (data) {
            console.log(data);
            FYSCloud.API.uploadFile(
                salt(10) + "." + data.extension,
                data.url
            ).done(function (url) {
                FYSCloud.API.queryDatabase(
                    "UPDATE gebruiker SET profiel_foto = ? WHERE gebruiker_id = ?",
                    [url]
                ).done(function (data) {
                    console.log(data);
                });
                console.log(data);
            }).fail(function (reason) {
                console.log(reason);
            });
            console.log(data);
            // alert("geluk 1");
            // FYSCloud.URL.redirect("profielpagina.html");
        }).fail(function (reason) {
        console.log(reason);
    });
}
//gebruike bij de profielfoto zodat het random blijft
function salt(length) {
    //constantes van alle unicode tekens die waaruit de salt mag bestaan.
    const ASCII_MIN = 48,
        ASCII_MAX = 122;
    let salt = '';
    let random;
    //loop door het aantal karakters heen waaruit de salt moet bestaan
    for (let i = 0; i <= length; i++) {
        //black list codes
        do {
            //genereer een random nummer
            random = Math.floor(Math.random() * (ASCII_MAX - ASCII_MIN) + ASCII_MIN);
            if ((random < 58 || random > 64) && (random < 91 || random > 96)) {
                //zet het getal om tot een ascii karakter, voeg deze daarna toe aan de salt string
                salt += String.fromCharCode(random);
            }
        } while ((random > 58 && random < 64) || (random > 91 & random < 96))
    }
    return salt;
}
