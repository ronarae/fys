//Run als het document geladen is en de ajax request klaar zijn.
includeDone(function() {
  $('.validate').focus(function() {
    let rules = [];
    if (hasAttr(this, 'minlength')) rules['minLength'] = getAttr(this, 'minLength');
    if (hasAttr(this, 'maxlength')) rules['maxLength'] = getAttr(this, 'maxLength');
    if (hasAttr(this, 'match')) rules['match'] = getAttr(this, 'match');
    if (hasAttr(this, 'contains')) rules['contains'] = getAttr(this, 'contains');
    $(this).keyup(function() {
      check(this, rules);
    });
  });
})

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
function check(element, rules) {
  //zet de variabele
  let passed = true;
  //get array van alle siblings
  let container = getSiblings(element, '.line-box');
  //get array van alle children
  let line = getChildren(container, '.line');
  //check of aan alle regels voldaan wordt.
  for (let rule in rules) {
    let value = rules[rule];
    switch (rule) {
      case 'minLength':
        if (!minLength(element.value, value)) passed = false;
        break;
      case 'maxLength':
        if (!maxLength(element.value, value)) passed = false;
        break;
      case 'match':
        if (!matchInput(element.value, value)) passed = false;
        break;
      case 'contains':
        if (!contains(element.value, value)) passed = false;
        break;
      default:
      console.log('error');
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
    for (let i = 0; i < element.length; i++) {
      //zoek het eerste element met die bepaalde klas als er een overeenkomst is, stop de loop
      if (element[i].className == type) {
        element = element[i];
        break;
      }
    }
  }
  //check of de zoekopdracht gaat om een id
  if (type.charAt(0) == '#') {
    //loop door alle elementen
    type = type.substr(1);
    for (let i = 0; i < element.length; i++) {
      //zoek het eerste element die aan de zoekopdracht voldoet, als er een overeenkomst is, stop de loop.
      if (element[i].id == type) {
        element = element[i];
        break;
      }
    }
  }
  return element;
}
