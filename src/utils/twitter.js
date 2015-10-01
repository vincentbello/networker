var Fetch = require('whatwg-fetch'),
    rootUrl = 'http://networker.vincentrbello.com/imageFromHandle.php';

module.exports = {

  imageFromHandle: function(handle) {
    return fetch(rootUrl + '?handle=' + handle, {
      mode: 'cors'
    })
    .then(function(response) {
      return response.json();
    });
  }

}

