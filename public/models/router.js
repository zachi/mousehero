export default (function () {
  var routes;
  var currentPath;
  function navigate(path) {
    if(currentPath)
      routes[currentPath].hide();
    currentPath = path;
    routes[path].show();
  }

  function init(routesParam) {
    routes = routesParam;
  }

  return {
    navigate: navigate,
    init: init
  }
})();