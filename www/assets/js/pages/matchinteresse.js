function match() {
  const interesse1 = $("input[name='blablabla']").val();
  if (interesse1) {
    console.log("geen waarder");
  } else {
    FYSCloud.API.queryDatabase(
      "SELECT * FROM gebruiker_has_interesses Where Gebruiker_gebruiker_id = ?",
      [FYSCloud.Session.get]
    ).done(function(data) {
      console.log(data);
    }).fail(reason => {
      console.log(reason);
    });
  }
}

function compare(array1, array2) {
  let equals = 0;
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        equals++;
      }
    }
  }
  return (equals / ((array1.length + array2.length) / 2) * 100);
}
