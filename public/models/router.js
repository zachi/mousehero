export default (function () {
  var routes;

  function navigate(path) {
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