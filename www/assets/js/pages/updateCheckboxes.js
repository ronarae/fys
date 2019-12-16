function laadAlleVelden(id, tabel) {
  let data_naam;
  let data_id;
  FYSCloud.API.queryDatabase(
    `SELECT * FROM interesses ${tabel}`
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

function getCheckedCheckboxes(selector) {
  let elements = $(selector);
  let array = [];
  for (let i = 0; i < elements.length; i++) {
    array[i] = elements[i].value;
  }
  return array;
}

includeDone(function() {
  laadAlleVelden('#interessesUpdate', 'interesses');
});
function laadAlleVelden(id, tabel) {
  let data_naam;
  let data_id;
  FYSCloud.API.queryDatabase(
    `SELECT * FROM interesses`
  ).done(function(data) {
    FYSCloud.API.queryDatabase(
        `SELECT * FROM gebruiker_has_interesses WHERE Gebruiker_gebruiker_id = ?`,
        [FYSCloud.Session.get('userId')]
      ).done(function(more_data) {
      for (let i = 0; i < data.length; i++) {
        let equals = false;
        for (let j = 0; j < more_data.length; j++) {
          if (more_data[j].Interesses_interesses_id === data[i].interesses_id) {
            equals = true;
          }
        }
        if (equals) {
          $(id).append(`
            <label class="checkbox-inline">
              <input type="checkbox" class="interesses_checkbox" value="${data[i].interesses_id}" checked />
              <span class="badge">${data[i].interesse_naam}</span>
            </label>
            `);
        } else {
          $(id).append(`
            <label class="checkbox-inline">
              <input type="checkbox" class="interesses_checkbox" value="${data[i].interesses_id}" />
              <span class="badge">${data[i].interesse_naam}</span>
            </label>
            `);
        }
        if ((i % 5) === 0 && i != 0) {
          $(id).append(`<br>`);
        }
      }
    }).fail(function(reason) {
    console.log(reason);
  });
  }).fail(function(reason) {
    console.log(reason);
  });
}