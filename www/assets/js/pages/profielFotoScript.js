function profielFotoUpdate () {
        console.log("gewerkt");
        let profiel_foto = $("#profiel_foto").val();

        //de ingevoerde waardes worden in de database gezet
    FYSCloud.Utils
        .getDataUrl($("#profiel_foto"))
        .done(function(data) {
            FYSCloud.API.uploadFile(
                profiel_foto,
                data.url
            ).done(function(data) {
                console.log(data);
            }).fail(function(reason) {
                console.log(reason);
            });
        }).fail(function(reason) {
        console.log(reason);
    });
}