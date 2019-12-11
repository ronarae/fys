function laadAlleInteresses(id) {
  FYSCloud.API.queryDatabase(
    "SELECT * FROM interesses"
  ).done(function(data) {
    for (let i = 0; i < data.length; i++) {
      $(id).append(`
        <label class="checkbox-inline">
          <input type="checkbox" class="interesses_checkbox" value="${data[i].interesses_id}" />
          <span class="badge">${data[i].interesse_naam}</span>
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
  laadAlleInteresses('#interesses');

});
