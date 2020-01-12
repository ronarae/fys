$(document).ready(() => {
  FYSCloud.API.queryDatabase(
    "SELECT profiel_foto FROM gebruiker WHERE gebruiker_id = ?",
    [FYSCloud.Session.get('userId')]
  ).done(data => {
    console.info(data);
    $('#avatar').attr('src', data[0].profiel_foto);
  }).fail(reason => console.error(reason));
});

function profielFotoUpdate() {

    let avatar = $("#profiel_foto");
    FYSCloud.API.queryDatabase(
      "SELECT profiel_foto FROM gebruiker WHERE gebruiker_id = ?",
      [FYSCloud.Session.get('userId')]
    ).done(data => {
      console.log(data);
      let file_name = data[0].profiel_foto.split('/');
      file_name = file_name[file_name.length - 1];
      FYSCloud.API.deleteFile(file_name).done(data => {
        console.info(data);
        FYSCloud.Utils
            .getDataUrl(avatar)
            .done(function (data) {
                console.log(data);
                if (data.isImage) {
                  $('#avatar').attr('src', data.url);
                }
                FYSCloud.API.uploadFile(
                    salt(10) + "." + data.extension,
                    data.url
                ).done(function (url) {
                    FYSCloud.API.queryDatabase(
                        "UPDATE gebruiker SET profiel_foto = ? WHERE gebruiker_id = ?",
                        [url, FYSCloud.Session.get('userId')]
                    ).done(function (data) {
                        console.log(data);
                    });
                    console.log(url);
                }).fail(function (reason) {
                    console.log(reason);
                });
        }).fail(function (reason) {
        console.log(reason);
      });
    }).fail(reason => console.error(reason));
    //de ingevoerde waardes worden in de database gezet
  }).fail(reason => console.error(reason));
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
