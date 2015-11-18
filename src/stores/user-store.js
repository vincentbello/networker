var React = require('react/addons'),
    update = React.addons.update,
    Firebase = require('firebase'),
    firebaseUrl = require('../utils/constants').FIREBASE_URL,
    Reflux = require('reflux'),
    Actions = require('../actions');

var baseRef = new Firebase(firebaseUrl),
    usersRef = baseRef.child('users');

var defaultUser = {
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  isLoggedIn: false,
  md5hash: null,
  meetups: null,
  connections: null
};

var data = Object.assign({}, defaultUser);

module.exports = Reflux.createStore({

  listenables: [Actions],

  init: function() {
    // triggered by auth changes
    var self = this;

    baseRef.onAuth(function(authData) {
      if (!authData) {
        // user is logged out
        usersRef.off();
        self.postLogout();
      } else {
        // user is logged in
        self.postLogin(authData.uid);
      }
    });
  },

  logout: function() {
    baseRef.off();
  },

  postLogout: function() {
    // reset current user to default
    data = Object.assign({}, defaultUser);
    this.trigger(data);
  },

  postLogin: function(userId) {
    // get username
    usersRef.child(userId).once('value', function(userObj) {
      var user = userObj.val();

      data = {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        isLoggedIn: true,
        md5hash: user.md5hash,
        meetups: user.meetups,
        connections: user.connections
      };

      usersRef
          .child(userId + '/meetups')
          .on('value', this._updateMeetups);

      usersRef
          .child(userId + '/connections')
          .on('value', this._updateConnections);
    });
  },

  _updateMeetups: function(meetupsObj) {
    data.meetups = meetupsObj.val();
    this.trigger(data);
  },

  _updateConnections: function(connectionsObj) {
    data.connections = connectionsObj.val();
    this.trigger(data);
  },

  getUserId: function(email) {
    // returns userId given email address
    return new Promise(function(resolve) {
      usersRef
          .orderByChild('email')
          .equalTo(email)
          .once('value', function(user) {
            var userId = Object.keys(user.val())[0];
            resolve(userId);
          });
    });
  },

  getData: function() {
    return data;
  }

})
