//Run als het document geladen is.
$(document).ready(function() {
    //run als er een element met de class validate gefocused wordt
    $(".validate").focus(function() {
      console.log('validate');
        //run als er een toets losgelaten wordt.
        $(this).keyup(function() {
            //run de functie check over het element die gefocused is als er een toets losgelaten wordt.
            check(this);
        });
    });
});


// check of een element een bepaald attribute heeft
function hasAttr(element, attribute) {
    return element.hasAttribute(attribute);
}

// geef de waarde van een attribute terug
function getAttr(element, attribute) {
    var attribute = element.getAttribute(attribute);
    return attribute;
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
function matchInput(element, id) {
    console.log($("#" + id));
    value2 = $("#" + id).value;
    return element == value2;
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
  console.log('check');
    //zet de variabele
    let passed = true;
    //get array van alle siblings
    let container = getSiblings(element, '.line-box');
    //get array van alle children
    let line = getChildren(container, '.line');
    //check of aan alle regels voldaan wordt.
    if (hasAttr(element, 'minlength')) {
        if (!minLength(element.value, getAttr(element, 'minlength'))) {
            passed = false;
        }
    }
    if (hasAttr(element, 'maxlength')) {
        if (!maxLength(element.value, getAttr(element, 'maxlength'))) {
            passed = false;
        }
    }
    if (hasAttr(element, 'match')) {
        if (!matchInput(element.value, getAttr(element, 'match'))) {
            passed = false;
        }
    }
    if (hasAttr(element, 'contains')) {
        if (!contains(element.value, getAttr(element, 'contains'))) {
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
function getChildren(element, type = null) {
    //element is gelijk aan element.children
    element = element.children;
    //check of het niet null is
    if (type != null) {
        element = searchElements(element, type);
    }
    return element;
}

//get een array van alle siblings
function getSiblings(element, type = null) {
    //element is gelijk aan de alle children van het parent element
    element = element.parentNode.children;
    //check of het niet null is
    if (type != null) {
        element = searchElements(element, type);
    }
    return element;
}

//kijk of een een array van elementen een bepaald element bevat.
function searchElements(element, type) {
    //check of de variabele niet begint met een . of een #
    if (type.charAt(0) != '.' && type.charAt(0) != '#') {
        //loop door alle elementen heen en check of het een de type van het element overeenkomt met de zoekopdracht
        for (let i = 0; i < element.length; i++) {
            //als de zoekopdracht overeenkomt stop de loop
            if (element[i].nodeName.toLowerCase() == type) {
                element = element[i];
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
