// run als het document geladen is
$(document).ready(function() {
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
    var active = $(".tab.active");
    //verwijder de disabled attribute van de prevBtn id
    $("#prevBtn").prop("disabled", false);
    $("#prevBtn").removeAttr("disabled");
    //check of het volgende element de class tab heeft
    if (active.next().hasClass("tab")) {
        // verplaats de class naar de volgende tab en verhoog de progressbar
        active.removeClass("active");
        active = active.next();
        active.addClass("active");
        progressBar(20);
    }
    //als er niet nog een pagina na komt, disable de knop om naar de volgende pagina te gaan.
    if (!active.next().hasClass("tab")) {
        $("#nextBtn").attr("disabled", "");
    }
}

//functie vorige pagina
function previousPage() {
    //selecter de active tab
    var active = $(".tab.active");
    //verwijder de disabled attribute van de nextBtn id
    $("#nextBtn").prop("disabled", false);
    $("#nextBtn").removeAttr("disabled");
    //kijk of de vorige element de class tab heeft
    if (active.prev().hasClass("tab")) {
        //verplaats de active class naar het vorige element en verlaag de progressbar
        active.removeClass("active");
        active = active.prev();
        active.addClass("active");
        progressBar(-20);
    }
    //als er niet een tab voor komt disable de button om naar de vorige pagina te gaan
    if (!active.prev().hasClass("tab")) {
        $("#prevBtn").attr("disabled", "");
    }
}

//functie progressbar
function progressBar(add) {
    //zet de variabele voor de het geselecteerde element en bepaalde attributen
    var bar = $("#registerProgress");
    var arianow = bar.attr("aria-valuenow");
    var curVal = parseInt(arianow);
    var newVal = curVal + add;
    //zet de variabelen als waardes bij het element
    bar.attr("aria-valuenow", newVal);
    bar.css("width", newVal + "%");
    bar.text(newVal + "%");
}