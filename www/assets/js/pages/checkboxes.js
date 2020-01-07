function laadAlleVelden(id, tabel) {
    let data_naam;
    let data_id;
    FYSCloud.API.queryDatabase(
        `SELECT * FROM ${tabel}`
    ).done(function(data) {
        for (let i = 0; i < data.length; i++) {
            data_id = (tabel == 'interesses') ? data[i].interesses_id : data[i].bestemming_id;
            data_naam = (tabel == 'interesses') ? data[i].interesse_naam : data[i].bestemming_naam;
            $(id).append(`
        <label class="checkbox-inline">
          <input type="checkbox" class="${tabel}_checkbox" value="${data_id}" />
          <span class="badge">${data_naam}</span>
        </label>
        `);
            if ((i % 5) === 0 && i != 0) {
                $(id).append(`<br>`);
            }
        }
    }).fail(function(reason) {
        console.log(reason);
    });
}

function getCheckBoxesFromTable(id, userId, tabel) {
    FYSCloud.API.queryDatabase(
        "SELECT i.interesses_id, i.interesse_naam FROM " + tabel + " i INNER JOIN Gebruiker_has_" + tabel + " g ON i." + tabel + "_id = g." + tabel + "_" + tabel + "_id WHERE Gebruiker_gebruiker_id = ?", [userId]
    ).done(data => {
        for (let i = 0; i < data.length; i++) {
            $(id).append(`
            <label class="checkbox-inline">
              <input type="checkbox" class="${tabel}_checkbox" value="${data[i].interesses_id}" checked disabled/>
              <span class="badge">${data[i].interesse_naam}</span>
            </label>
        `);
        }
    }).fail(reason => {
        console.error(reason);
    });
}

function getCheckedCheckboxes(selector) {
    let elements = $(selector);
    let array = [];
    for (let i = 0; i < elements.length; i++) {
        array[i] = elements[i].value;
    }
    return array;
}