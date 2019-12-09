function match() {
    const interesse1 = $("input[name='blablabla']").val();
if(interesse1){
    console.log("geen waarder");
}
else{
    FYSCloud.API.queryDatabase(
        "SELECT * FROM gebruiker_has_interesses Where interesses_interesses_id = ?",
        [interesse1]
    ).done(function (data) {
        console.log(data);
    }).fail(reason => {
        console.log(reason);
    });
}
}