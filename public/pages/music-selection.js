import htmlTemplate from "../models/html-template.js"
import router from "../models/router.js";
import audio from "../models/audio.js";


export default (function () {
  function handlePlaylistSelection(e) {   
      audio.init( '/music/' + e.target.innerText );
      router.navigate('/instructions');
  }
  return {
    show: function () {
      axios.get('/music/list.json')
      .then(function (response) {
        htmlTemplate.compileToDomElement("/templates/music-selection.html", {playlists:response.data}, function (element) {
          document.body.appendChild( element );
          document.querySelectorAll('.music-selection__playlist-button')
          .forEach(el => el.addEventListener('click', handlePlaylistSelection))
        })

      
      })
      .catch(function (error) {
        console.log(error);
      });

      
    },
    hide:function(){
      var elem = document.querySelector('.music-selection');
      elem.parentNode.removeChild(elem);     
    }
  }
})()