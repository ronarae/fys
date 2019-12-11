if (!FYSCloud.Session.get('userId')) {
  alert('Je moet ingelogd zijn om deze pagina te bekijken!');
  FYSCloud.URL.redirect('index.html');
}
