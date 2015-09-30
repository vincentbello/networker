var Reflux = require('reflux'),
    Firebase = require('firebase'),
    Actions = require('../actions'),
    firebaseUrl = require('../utils/constants').FIREBASE_URL;

var baseRef = new Firebase(firebaseUrl),
    connectionsRef = baseRef.child('connections');

var data = {
  connections: [],
  sort: {
    asc: true,
    by: 'name'
  }
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  watchConnections: function(meetupId) {
    connectionsRef
      .orderByChild('meetupId')
      .startAt(meetupId)
      .endAt(meetupId)
      .on('value', this._updateConnections);
  },

  _updateConnections: function(connectionsObj) {
    var newConnections = [];

    connectionsObj.forEach(function(connectionObj) {
      var connection = connectionObj.val();
      connection.id = connectionObj.key();
      newConnections.push(connection);
    });

    data.connections = newConnections;

    this.trigger(data);
  },

  getData: function() {
    return data;
  },

  addConnection: function(newConnection) {
    var newRef = connectionsRef.push(newConnection, function(err) {
      if (err) {
        console.log('error: ' + err);
        return;
      }
      Actions.hideModal();
    });
    newRef.setPriority(newConnection.name);
  },

  removeConnection: function(connectionId) {
    connectionsRef.child(meetupId).remove(function(err) {
      if (err) {
        console.log('error: ' + err);
        return;
      }
    });
  }
});