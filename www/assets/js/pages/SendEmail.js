$(document).ready(function() {
 sendEmail();
});

function sendEmail(userId) {

    // let email = $('#email');

    // let interesses = $('#interesses')
    let email_veld = $('#email-veld').html();
    let subjectveld = $('#subjectveld').val();

    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker WHERE gebruiker_id = ?", [userId]
    ).done(function(data) {
        let naam = data[0].voornaam;
        console.log(data);
        FYSCloud.API.sendEmail({
            from: {
                name: "Group 5 Assemble",
                address: "group@fys.cloud"
            },
            to: [
                {
                    name: naam,
                    address: data[0].email
                }
            ],
            subject: subjectveld,
            html: email_veld
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