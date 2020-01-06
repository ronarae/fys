FYSCloud.API.queryDatabase(
    "SELECT rechten_id FROM gebruiker WHERE gebruiker_id = ?", [FYSCloud.Session.get('userId')]
).done(data => {
    if (data[0].rechten_id !== 2) {
        FYSCloud.API.queryDatabase(
            "SELECT r.rechten_naam FROM rechten r INNER JOIN gebruiker g ON r.rechten_id = g.rechten_id WHERE g.gebruiker_id = ?", [FYSCloud.Session.get('userId')]
        ).done(data => {
            alert(`Je moet ${data.rechten_naam} om deze pagina te kunnen bekijken.`)
            FYSCloud.URL.Redirect('index.html')
        })
    }
})