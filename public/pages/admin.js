import htmlTemplate from "../models/html-template.js"
import router from "../models/router.js";
import db from "../models/db.js";
import texts from "../models/texts.js"

export default (function () {

  var uploadButton;
  var sessionUploadPanel;
  function error(msg) {
    document.body.querySelector('.session-form__error').innerText = msg;
  }

  function handleUploadClick(e) {
    
    if (uploadButton.classList.contains('mousehero__button--disabled'))
      return;
    sessionUploadPanel.classList.add('admin__session-upload--uploading');
    uploadButton.classList.add('mousehero__button--disabled')
    db.getCoordinates(function (data) {
      axios.post('/coordinates', data)
        .then(function (response) {
          uploadButton.classList.remove('mousehero__button--disabled');
          sessionUploadPanel.classList.remove('admin__session-upload--uploading');
          document.body.querySelector('.session-upload__title').innerText = response.data.success ? texts.sessionsUploadedSuccesfully : texts.sessionsUploadFailure;
          document.body.querySelector('.session-upload__title').style.color = response.data.success ? 'green' : 'red';
          if(response.data.success)
            db.removeAllCoordinates();
          console.log(response);
        })
        .catch(function (error) {
          uploadButton.classList.remove('mousehero__button--disabled');
          sessionUploadPanel.classList.remove('admin__session-upload--uploading');
          document.body.querySelector('.session-upload__title').innerText = error;

          console.log(error);
        });
    })
  }

  function handleLoginClick(){
    if(document.body.querySelector('.admin-login__password').value === 'omer')
    {
      document.body.querySelector('.mousehero__admin').classList.add('mousehero__admin--successfull-login');
    }
  }

  function show() {

    htmlTemplate.compileToDomElement("/templates/admin.html", texts, function (html) {
      document.body.appendChild(html);
      uploadButton = document.body.querySelector('.session-upload__button');
      sessionUploadPanel = document.body.querySelector('.admin__session-upload');
      uploadButton.addEventListener('click', handleUploadClick)


      document.body.querySelector('.admin-login__button').addEventListener('click', handleLoginClick)
      
    });

  }

  function hide() {

    uploadButton.removeEventListener('click', handleUploadClick)
    var elem = document.querySelector('.session-form');
    elem.parentNode.removeChild(elem);

  }

  return {
    show: show,
    hide: hide
  }
})()