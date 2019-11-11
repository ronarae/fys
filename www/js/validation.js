function hasAttr(el, attr) {
    return el.hasAttribute(attr);
}

function getAttr(el, attr) {
    var attr = el.getAttribute(attr);
    return attr;
}

function minLength(text, min) {
    return text.length >= min;
}

function maxLength(text, max) {
    return text.length <= max;
}

function matchInput(input1, input2) {
    return input1 == input2;
}

function contains(text, regex) {
    let regEx = new RegExp(regex);
    return regEx.test(text);
}

function check(el) {
    let passed = true;
    let container = getSiblings(el, '.line-box');
    let line = getChildren(container, '.line');
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
    if (passed) {
        line.style.background = "green";
    } else {
        line.style.background = "red";
    }
}

function getChildren(el, type = null) {
    el = el.children;
    if (type != null) {
        el = searchElements(type);
    }
    return el;
}

function getSiblings(el, type = null) {
    el = el.parentNode.children;
    if (type != null) {
        el = searchElements(type);
    }
    return el;
}

function searchElements(search) {
    let el;
    if (type.charAt(0) != '.' && type.charAt(0) != '#') {
        for (let i = 0; i < el.length; i++) {
            if (el[i].nodeName.toLowerCase() == type) {
                el = el[i];
                break;
            }
        }
    }
    if (type.charAt(0) == '.') {
        type = type.substr(1);
        for (let i = 0; i < el.length; i++) {
            if (el[i].className == type) {
                el = el[i];
                break;
            }
        }
    }
    if (type.charAt(0) == '#') {
        type = type.substr(1);
        for (let i = 0; i < el.length; i++) {
            if (el[i].id == type) {
                el = el[i];
                break;
            }
        }
    }
    return el;
}