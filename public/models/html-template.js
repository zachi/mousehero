export default (function () {
  var templates = []

  function compile(path, context, callback) {
    if (!templates.includes(path)) {
      axios.get(path)
        .then(function (response) {
          templates[path] = Handlebars.compile(response.data);
          callback(templates[path](context));
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
    callback(templates[path](context));

  }

  function compileToDomElement(templateId, context, callback) {

    compile(templateId, context, function (html) {
      var div = document.createElement('div');
      div.innerHTML = html.trim();
      // Change this to div.childNodes to support multiple top-level nodes
      callback( div.firstChild);
    })

  }

  return {
    compile: compile,
    compileToDomElement: compileToDomElement
  }
})();