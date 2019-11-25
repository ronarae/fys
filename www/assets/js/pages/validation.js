//Run als het document geladen is.
$(document).ready(function() {
    //run als er een element met de class validate gefocused wordt
    $(".validate").focus(function() {
        //run als er een toets losgelaten wordt.
        $(this).keyup(function() {
            //run de functie check over het element die gefocused is als er een toets losgelaten wordt.
            check(this);
        });
    });
});

// check of een element een bepaald attribute heeft
function hasAttr(el, attr) {
    return el.hasAttribute(attr);
}

// geef de waarde van een attribute terug
function getAttr(el, attr) {
    var attr = el.getAttribute(attr);
    return attr;
}

//check of een string een bepaalde minimale lengte heeft
function minLength(text, min) {
    return text.length >= min;
}

//check of een strin geen bepaalde maximum lengte heeft
function maxLength(text, max) {
    return text.length <= max;
}

//check of 2 strings hetzelfde zijn
function matchInput(el, id) {
    value1 = el.value;
    value2 = $("#" + id).value;
    return value1 == value2;
}

//check of een string aan bepaalde regex regels voldoet
function contains(text, regex) {
    //maak een nieuwe regexp
    let regEx = new RegExp(regex);
    //test of de regexp aan de regels voldoet
    return regEx.test(text);
}

//check een bepaald element of het aan de regels die in het element staan voldoet
function check(el) {
    //zet de variabele
    let passed = true;
    //get array van alle siblings
    let container = getSiblings(el, '.line-box');
    //get array van alle children
    let line = getChildren(container, '.line');
    //check of aan alle regels voldaan wordt.
    if (hasAttr(el, 'minlength')) {
        if (!minLength(el.value, getAttr(el, 'minlength'))) {
            passed = false;
        }
    }
    if (hasAttr(el, 'maxlength')) {
        if (!maxLength(el.value, getAttr(el, 'maxlength'))) {
            passed = false;
        }
    }
    if (hasAttr(el, 'match')) {
        if (!matchInput(el.value, getAttr(el, 'match'))) {
            passed = false;
        }
    }
    if (hasAttr(el, 'contains')) {
        if (!contains(el.value, getAttr(el, contains))) {
            passed = false;
        }
    }

    //als alle regels true groene achtergrond, anders rode achtergrond
    if (passed) {
        line.style.background = "green";
    } else {
        line.style.background = "red";
    }
}

// get een array van alle children
function getChildren(el, type = null) {
    //element is gelijk aan element.children
    el = el.children;
    //check of het niet null is
    if (type != null) {
        el = searchElements(el, type);
    }
    return el;
}

//get een array van alle siblings
function getSiblings(el, type = null) {
    //element is gelijk aan de alle children van het parent element
    el = el.parentNode.children;
    //check of het niet null is
    if (type != null) {
        el = searchElements(el, type);
    }
    return el;
}

//kijk of een een array van elementen een bepaald element bevat.
function searchElements(el, type) {
    //check of de variabele niet begint met een . of een #
    if (type.charAt(0) != '.' && type.charAt(0) != '#') {
        //loop door alle elementen heen en check of het een de type van het element overeenkomt met de zoekopdracht
        for (let i = 0; i < el.length; i++) {
            //als de zoekopdracht overeenkomt stop de loop
            if (el[i].nodeName.toLowerCase() == type) {
                el = el[i];
                break;
            }
        }
    }
    //check of de zoekopdracht gaat om een class
    if (type.charAt(0) == '.') {
        //loop door alle elementen
        type = type.substr(1);
        for (let i = 0; i < el.length; i++) {
            //zoek het eerste element met die bepaalde klas als er een overeenkomst is, stop de loop
            if (el[i].className == type) {
                el = el[i];
                break;
            }
        }
    }
    //check of de zoekopdracht gaat om een id
    if (type.charAt(0) == '#') {
        //loop door alle elementen
        type = type.substr(1);
        for (let i = 0; i < el.length; i++) {
            //zoek het eerste element die aan de zoekopdracht voldoet, als er een overeenkomst is, stop de loop.
            if (el[i].id == type) {
                el = el[i];
                break;
            }
        }
    }
    return el;
}