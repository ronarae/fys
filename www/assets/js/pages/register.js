// run als het document geladen is
includeDone(function() {
  //check voor input focus

  $('.input').focus(function() {
    //voeg de class label-active toe om het element te animeren
    $(this).parent().find(".animated").addClass('label-active');
  });

  //check voor input focus out
  $(".input").focusout(function() {
    //als de waarde niet nul is
    if ($(this).val() == '') {
      // verwijder de class label-active
      $(this).parent().find(".animated").removeClass('label-active');
    };
  });
});
//functie volgende pagina
function nextPage() {
  //selecter de active tab
  let active = $(".tab.active");
  //verwijder de disabled attribute van de prevBtn id
  $("#prevBtn").prop("disabled", false);
  $("#prevBtn").removeAttr("disabled");
  //check of het volgende element de class tab heeft
  if (active.next().hasClass("tab")) {
    // verplaats de class naar de volgende tab en verhoog de progressbar
    active.removeClass("active");
    active = active.next();
    active.addClass("active");
    progressBar(18);
  }
  //als er niet nog een pagina na komt, disable de knop om naar de volgende pagina te gaan.
  if (!active.next().hasClass("tab")) {
    $("#nextBtn").attr("disabled", "");
  }
}

//functie vorige pagina
function previousPage() {
  //selecter de active tab
  let active = $(".tab.active");
  //verwijder de disabled attribute van de nextBtn id
  $("#nextBtn").prop("disabled", false);
  $("#nextBtn").removeAttr("disabled");
  //kijk of de vorige element de class tab heeft
  if (active.prev().hasClass("tab")) {
    //verplaats de active class naar het vorige element en verlaag de progressbar
    active.removeClass("active");
    active = active.prev();
    active.addClass("active");
    progressBar(-18);
  }
  //als er niet een tab voor komt disable de button om naar de vorige pagina te gaan
  if (!active.prev().hasClass("tab")) {
    $("#prevBtn").attr("disabled", "");
  }
}

//functie progressbar
function progressBar(add) {
  //zet de variabele voor de het geselecteerde element en bepaalde attributen
  let bar = $("#registerProgress");
  let arianow = bar.attr("aria-valuenow");
  let curVal = parseInt(arianow);
  let newVal = curVal + add;
  //zet de variabelen als waardes bij het element
  bar.attr("aria-valuenow", newVal);
  bar.css("width", newVal + "%");
  bar.text(newVal + "%");
}

//functie voor het registeren van een gebruiker
function Register() {
  let voornaam = $("#voornaam").val();
  let tussenvoegsel = $("#tussenvoegsel").val();
  let achternaam = $("#achternaam").val();
  // let salt = salt(32);
  // achternaam = encrypt(achternaam);
  let geslacht = $("#geslacht").val();
  let geboorte_datum = $("#geboorte_datum").val();
  let avatar = $("#avatar");
  let bio = $("#bio").val();
  let wachtwoord = $("#wachtwoord").val();
  let email = $("#email").val();
  let interesses = getCheckedCheckboxes($('input.interesses_checkbox:checkbox:checked'));
  //de ingevoerde waardes worden in de database gezet
  FYSCloud.Utils.getDataUrl(avatar).done(function(data) {
    FYSCloud.API.uploadFile(
      salt(10) + "." + data.extension,
      data.url
    ).done(function(url) {
      let picture_url = url;
      FYSCloud.API.queryDatabase(
        "INSERT INTO gebruiker(voornaam, tussenvoegsel, achternaam, email, wachtwoord, geslacht, geboortedatum, profiel_foto, bio) VALUES(?,?,?,?,?,?,?,?,?)",
        [voornaam, tussenvoegsel, achternaam, email, wachtwoord, geslacht, geboorte_datum, url, bio]
      ).done(function(data) {
        console.log(data);
        FYSCloud.Session.set('userId', data.insertId);
        let query = "INSERT INTO gebruiker_has_interesses (Gebruiker_gebruiker_id, Interesses_interesses_id) VALUES ";
        for (let i = 0; i < interesses.length; i++) {
          if ((i + 1) >= interesses.length) {
            query += "('" + FYSCloud.Session.get('userId') + "' , ?)";
          } else {
            query += "(" + FYSCloud.Session.get('userId') + ", ?), ";
          }
        }
        console.log(query);
        FYSCloud.API.queryDatabase(query, interesses).done(function(data) {
          FYSCloud.URL.redirect('profielpagina.html');
        }).fail(function(reason) {
          console.log(reason)
        });
      }).fail(function(reason) {
        console.log(reason);
      });
    }).fail(function(reason) {
      console.log(reason);
    })
  }).fail(function(reason) {
    console.log(reason);
  });
}

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
