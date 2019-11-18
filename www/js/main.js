// functions run als de pagina geladen is
$(document).ready(function() {
    scroll();
    includeHTML();
});

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
                            element.innerHTML = this.responseText;
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
    }
}