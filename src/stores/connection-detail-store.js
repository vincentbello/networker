var Reflux = require('reflux'),
    Firebase = require('firebase'),
    Actions = require('../actions'),
    firebaseUrl = require('../utils/constants').FIREBASE_URL;

var baseRef = new Firebase(firebaseUrl),
    connectionsRef = baseRef.child('connections');

var data = {
  connection: {}
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  watchConnection: function(connectionId) {
    connectionsRef
        .child(connectionId)
        .on('value', this._updateConnection.bind(this));
  },

  stopWatchConnection: function(connectionId) {
    connectionsRef
        .child(connectionId)
        .off();
  },

  _updateConnection: function(connectionData) {
    var connection = connectionData.val();

    if (connection) {
      connection.id = connectionData.key();
      data.connection = connection;
    } else {
      data.connection = null;
    }

    this.trigger(data);
  },

  deleteConnection: function(connectionId) {
    connectionsRef
        .child(connectionId)
        .set({
          isDeleted: true
        });
  },

  getData: function() {
    return data;
  }

});