$(document).ready(function() {
 sendEmail();
});

function sendEmail() {
    //
    // let email = $('#email');
    let naam = $('#naam');
    // let interesses = $('#interesses')
    let email_veld = $('#email-veld');
    let subjectveld = $('#subjectveld');

    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker gebruiker_id = ?", [userId]
    ).done(function(data) {
        console.log(data);
        FYSCloud.API.sendEmail({
            from: {
                name: "Group 5 Assemble",
                address: "group@fys.cloud"
            },
            to: [
                {
                    name: naam,
                    address: email
                }
            ],
            subject: subjectveld,
            text: email_veld,
            html: "<h1>Je bent gematched!!!</h1><p>Je bent gematched met iemand :)</p>"
        }).done(function(data) {
            console.log(data);
        }).fail(function(reason) {
            console.log(reason);
        });

    }).fail(function(reason) {
        console.log(reason);
        alert("Er is iets misgegaan")
    });


}