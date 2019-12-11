function logout() {
  FYSCloud.Session.remove("userId");
  FYSCloud.URL.redirect("index.html");
}
