$(document).ready(() => {
    main();
})


function main() {
    let table = $('#gebruikertabel');
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE gebruiker_id <> ?", [FYSCloud.Session.get('userId')]
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
                        <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].rechten_id}</td>
                        <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' onclick='remove(${data[i].gebruiker_id})'>X</button></td>
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
                        <td style='border: 1px solid #FFFFFF;text-align: left;padding: 8px;'>${data[i].rechten_id}</td>
                        <td style='border: 1px solid #FFFFFF; text-align: left; padding: 8px;'><button class='btn btn-link text-danger' onclick='remove(${data[i].gebruiker_id})'>X</button></td>
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