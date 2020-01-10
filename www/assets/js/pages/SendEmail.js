$(document).ready(function() {
 SendEmail();
});

function SendEmail() {

    let email = $('#email');
    let naam = $('#naam');

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
        subject: "Je bent aangemeld voor Assemble!!!",
        html: "<h1>Hello Team 5</h1><p>This is an email :)</p>"
    }).done(function(data) {
        console.log(data);
    }).fail(function(reason) {
        console.log(reason);
    });

}