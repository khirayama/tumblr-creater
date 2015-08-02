(function () {
  var pathname = location.pathname;
  switch (true) {
    case (pathname.indexOf('blog') !== -1):
      document.querySelector('main.schedule').style.display = 'none';
      break;
    case (pathname.indexOf('schedule') !== -1):
      document.querySelector('main.blog').style.display = 'none';
      break;
  }
})();
