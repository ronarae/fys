let loaded = false;
// functions run als de pagina geladen is
$(document).ready(function() {
    scroll();
    includeHTML();
});


//wordt geladen als alle includes ingeladen zijn.
includeDone(function() {
    loginLogout();
});

function loginLogout() {
    if (FYSCloud.Session.get('userId')) {
        FYSCloud.API.queryDatabase(
            "SELECT rechten_id FROM gebruiker WHERE gebruiker_id = ?", [FYSCloud.Session.get('userId')]
        ).done(data => {
            if (data[0].rechten_id !== 2) {
                $('#navbarCollapse').append(
                    `<a href='profielpagina.html' class='text-white text-uppercase'><b>Mijn Profiel</b></a>
          <button class='btn btn-link text-white nav-link text-uppercase' onclick='logout()'><b>Log Uit</b></button>`
                );
            } else {
                $('#navbarCollapse').append(
                    `<a href='adminpagina.html' class='text-white text-uppercase mr-3'><b>Admin Pagina</b></a>
                    <a href='profielpagina.html' class='text-white text-uppercase'><b>Mijn Profiel</b></a>
                    <button class='btn btn-link text-white nav-link text-uppercase' onclick='logout()'><b>Log Uit</b></button>`
                );
            }
        }).fail(reason => console.error(reason))
    } else {
        $('#navbarCollapse').append(
            `<a href="register.html" class="nav-link text-white">
      <i class="fas fa-user"></i> Registreren
      </a>
      <button data-toggle='modal' data-target='#loginModal' class='nav-link text-white btn btn-link'>
      <i class='fas fa-sign-in-alt'></i> Login
      </button>`

        );
    }
}

//smooth scroll
function scroll() {
    //selecteer alle a element met een href tag wat een # bevat
    $('a[href*="#"]')
        // Verwijder de linken die nergens naar verwijzen
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // Als er op een link geklikt wordt
            if (
                //vervang alle slashes met een lege string
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Zoek het element waar de link naar verwijst.
                var targetEl;
                var isTop = false;
                // Variable target is gelijk aan de momentele link path
                var target = $(this.hash);
                //als de hash gelijk is aan top zet de locatie op window y op 0
                if (this.hash.slice(1) == "top") {
                    targetEl = 0;
                    isTop = true;
                }
                //anders zet de target gelijk aan de y coordinate van het target element
                else {
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    targetEl = target.offset().top;
                }
                // Is de target gezet
                if (target.length || isTop === true) {
                    // Zorg ervoor dat de link niet werkt, maar dat de andere animatie gebruikt wordt.
                    event.preventDefault();
                    // Speel de animatie af
                    $('html, body').animate({
                        scrollTop: targetEl
                    }, 1000, function() {
                        // Run als de animatie afgelopen is
                        // Verander de focus
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Kijk of de target gefocused was
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Voeg een tabindex toe aan elementen die niet gefocused waren
                            $target.focus(); // Focus de target
                        };
                    });
                }
            }
        });
}
//include html bestanden
function includeHTML() {
    let z, i, element, file, xhttp;

    //loop door alle html elementen
    z = document.getElementsByTagName('*');
    for (let i = 0; i < z.length; i++) {
        element = z[i];
        //zoek element met het attribute include
        if (element.hasAttribute('include')) {
            file = element.getAttribute('include');
            //nieuw xmlhttprequest
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                    // kijk of er een foutmelding is bij de xmlhttprequest
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            let html = jQuery.parseHTML(jQuery.trim(this.responseText));
                            $(element).append(html);
                        }
                        if (this.status == 404) {
                            element.innerHTML = "Page not Found";
                        }
                        element.removeAttribute('include');
                        includeHTML();
                    }
                }
                //open het bestand
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
        if ((i + 1) >= z.length) loaded = true;
    }
}

function includeDone(callback) {
    let interval = setInterval(function() {
        if (loaded) {
            clearInterval(interval);
            callback();
        }
    });
}