export default (function () {

  function compileTemplate(templateId, context) {

    var source = document.querySelector('link[id="' + templateId + '"]').import;
    var template = Handlebars.compile(source.body.innerHTML);
    //var context = { name:this.imageName };
    var html = template(context);
    return html;
  }

  function compileTemplateToDomElement(templateId, context) {

    var div = document.createElement('div');
    div.innerHTML = compileTemplate(templateId, context).trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  return {
    compileTemplate: compileTemplate,
    compileTemplateToDomElement: compileTemplateToDomElement
  }
})();