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

function getCheckedCheckboxes(selector) {
  let elements = $(selector);
  let array = [];
  for (let i = 0; i < elements.length; i++) {
    array[i] = elements[i].value;
  }
  return array;
}

includeDone(function() {
  laadAlleVelden('#interesses', 'interesses');
  laadAlleVelden('#bestemmingen', 'bestemming');
});
