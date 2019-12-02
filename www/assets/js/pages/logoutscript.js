$(function() {
    FYSCloud.Session.remove("loggedin");
    setTimeout(function() {
        FYSCloud.URL.redirect("index.html");
    }, 5000);
});
