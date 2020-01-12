function sendEmail(vriendId) {
  let subject = $('#subject-field').val();
  let content = $.trim($('#email-field').val());
  if (content == '') {
    alert('Geeft u alstublieft een inhoud mee')
  } else {
    FYSCloud.API.queryDatabase(
      "SELECT voornaam, tussenvoegsel, achternaam, email FROM gebruiker WHERE gebruiker_id = ?",
      [vriendId]
    ).done(data => {
      console.info(data);
      receiver = data[0];
      FYSCloud.API.sendEmail({
        from: {
            name: "ASSEMBLE",
            address: "group@fys.cloud"
        },
        to: [
            {
                name: receiver.voornaam + ' ' + receiver.tussenvoegsel + ' ' + receiver.achternaam,
                address: receiver.email
            }
        ],
        subject: subject,
        html: content
      }).done(data => {
        console.info(data);
        alert('Bericht verzonden');
        $('#emailModal').modal('hide');
      }).fail(reason => console.error(reason));
    }).fail(reason => console.error(reason));
  }
}
