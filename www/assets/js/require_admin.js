isAdmin = false;

FYSCloud.API.queryDatabase(
    "SELECT rechten_id FROM gebruiker WHERE gebruiker_id = ?", [FYSCloud.Session.get('userId')]
).done(data => {
    if (data[0].rechten_id !== 2) {
        alert(`Je moet Admin zijn om deze pagina te kunnen bekijken.`)
        FYSCloud.URL.redirect('index.html')
    } else {
      isAdmin = true;
    }
});

function whenIsAdmin(callback) {
  let interval = setInterval(() => {
    if (isAdmin) {
      clearInterval(interval);
      callback();
    }
  }, 100);
}
