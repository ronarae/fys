function profielFotoUpdate() {
    //de ingevoerde waardes worden in de database gezet
    FYSCloud.Utils
        .getDataUrl($("#profiel_foto"))
        .done(function (data) {
            console.log(data);
            FYSCloud.API.uploadFile(
                data.fileName, //filname van de foto
                data.url
            ).done(function (data) {
                console.log(data);
            }).fail(function (reason) {
                console.log(reason);
            });
            console.log(data)
        }).fail(function (reason) {
        console.log(reason);
    });
}