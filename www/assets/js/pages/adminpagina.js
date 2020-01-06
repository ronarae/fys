$(document).ready(() => {
    main();
})


function main() {
    let table = $('#gebruikertabel');
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker"
    ).done(data => {
        table.append(`
            <table style='font-family: arial, sans-serif;border-collapse: collapse;width: 100%;'>
        `);
        for (let i = 0; i < data.length; i++) {
            table.append(`
                <tr ` + ((i % 2 === 0) ? `style='background-color: #dddddd;'` : `style='background-color: #FFFFFF'`) + `>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].gebruiker_id}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].voornaam}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].tussenvoegsel}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].achternaam}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].email}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].geboortedatum.split('T')[0]}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].geslacht}</td>
                    <td style='border: 1px solid #dddddd;text-align: left;padding: 8px;'>${data[i].rechten_id}</td>
                    <td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'><button onclick='remove(${data[i].gebruiker_id})'>X</button></td>
                </tr>
            `);
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