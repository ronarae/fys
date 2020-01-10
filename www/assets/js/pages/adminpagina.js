$(document).ready(() => {
  whenIsAdmin(() => main());
});


function main() {
    let table = $('#gebruikertabel');
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker g INNER JOIN rechten r ON g.rechten_id = r.rechten_id WHERE gebruiker_id <> ?", [FYSCloud.Session.get('userId')]
    ).done(data => {
        table.append(`
            <table style='font-family: arial, sans-serif;border-collapse: collapse;width: 100%;'>
        `);
        for (let i = 0; i < data.length; i++) {
            if (i % 2 === 0) {
                table.append(`
                    <tr style='background-color: #dddddd;'>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].gebruiker_id}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].voornaam}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].tussenvoegsel}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].achternaam}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].email}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].geboortedatum.split('T')[0]}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].geslacht}</td>
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].rechten_naam}</td>
                        <td style='border: 1px solid #dddddd; text-align: left; padding 8px;'><button class='btn btn-link' title='Update gebruikers gegevens' onclick='openUpdateWindow(${data[i].gebruiker_id})'>Update</button></td>
                        <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' title='verwijder gebruiker ${data[i].voornaam}' onclick='remove(${data[i].gebruiker_id})'>X</button></td>
                        <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'><button class='btn btn-link' onclick='makeAdmin(${data[i].gebruiker_id})'>Maak Admin</button></td>
                    </tr>
                `);
            } else {
                table.append(`
                    <tr style='background-color: #FFFFFF'>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].gebruiker_id}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].voornaam}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].tussenvoegsel}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].achternaam}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].email}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].geboortedatum.split('T')[0]}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].geslacht}</td>
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].rechten_naam}</td>
                        <td style='border: 1px solid #FFFFFF; text-align: left; padding 8px;'><button class='btn btn-link' title='Update gebruikers gegevens' onclick='openUpdateWindow(${data[i].gebruiker_id})'>Update</button></td>
                        <td style='border: 1px solid #FFFFFF; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' title='verwijder gebruiker ${data[i].voornaam}' onclick='remove(${data[i].gebruiker_id})'>X</button></td>
                        <td style='border: 1px solid #FFFFFF; text-align: left; padding: 8px;'><button class='btn btn-link' onclick='makeAdmin(${data[i].gebruiker_id})'>Maak Admin</button></td>
                    </tr>
                `);
            }
        }
        table.append(`</table>`);
    }).fail(reason => {
        console.error(reason);
    })
}

function remove(userId) {
    FYSCloud.API.queryDatabase(
        "DELETE FROM gebruiker WHERE gebruiker_id = ?", [userId]
    ).done(() => {
        $('#gebruikertabel').html('');
        main();
    }).fail(reason => {
        console.error(reason);
    })
}

function makeAdmin(userId) {
    if (window.confirm('Weet u zeker dat u deze gebruiker een Admin wil maken')) {
        FYSCloud.API.queryDatabase(
            "UPDATE gebruiker SET rechten_id = ? WHERE gebruiker_id = ?", [2, userId]
        ).done(data => {
            $('#gebruikertabel').html('');
            main();
        }).fail(reason => {
            console.error(reason);
        });
    }
}

function openUpdateWindow(userId) {
  let wrapper = $('#updateFormFieldsWrapper');
  wrapper.html('');
  FYSCloud.API.queryDatabase(
    "SELECT * FROM gebruiker WHERE gebruiker_id = ?",
    [userId]
  ).done(data => {
    const values = Object.entries(data[0]);
    for (let i = 0; i < values.length; i++) {
      wrapper.append(`
        <div class="form-group">
          <label for="${values[i][0]}">${values[i][0]}</label>
          <input type="text" class="form-control" id='${values[i][0]}' placeholder='${values[i][1]}' value='${values[i][1]}'>
        </div>
        `);
    }
    $('#updateModal').modal('show');
  }).fail(reason => {
    console.error(reason);
  })
}

function updateUser() {
  if (confirm('Weet U zeker dat u deze gebruiker wilt updaten?')) {
    let id = $('#gebruiker_id').val();
    let voornaam = $('#voornaam').val();
    let tussenvoegsel = $('#tussenvoegsel').val();
    let achternaam = $('#achternaam').val();
    let email = $('#achternaam').val();
    let wachtwoord = $('#wachtwoord').val();
    let geslacht = $('#geslacht').val();
    let geboortedatum = $('#geboortedatum').val().split('T')[0];
    let profiel_foto = $('#profiel_foto').val();
    let bio = $('#bio').val();
    let registratie_datetime = $('#registratie_datetime').val().split('T')[0];
    let rechten_id = $('#rechten_id').val();

    if (id == '' || voornaam == '' || achternaam == '' || email == '' || wachtwoord == '' || geslacht == '' || geboortedatum == '' || profiel_foto == '' || bio == '' || registratie_datetime == '' || rechten_id == '') {
      alert('Niet alle gegevens zijn ingevuld, probeer het alsjeblieft opniew.')
    } else {
      FYSCloud.API.queryDatabase(
        "UPDATE gebruiker SET voornaam = ?, tussenvoegsel = ?, achternaam = ?, email = ?, wachtwoord = ?, geslacht = ?, geboortedatum = ?, profiel_foto = ?, bio = ?, registratie_datetime = ?, rechten_id = ? WHERE gebruiker_id = ?",
        [voornaam, tussenvoegsel, achternaam, email, wachtwoord, geslacht, geboortedatum, profiel_foto, bio, registratie_datetime, rechten_id, id]
      ).done(data => {
        $('#gebruikertabel').html('');
        main();
        $('#updateModal').modal('hide');
      }).fail(reason => console.log(reason));
    }
  }
}
