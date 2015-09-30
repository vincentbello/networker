var Reflux = require('reflux'),
    Firebase = require('firebase'),
    Actions = require('../actions'),
    firebaseUrl = require('../utils/constants').FIREBASE_URL;

var baseRef = new Firebase(firebaseUrl),
    meetupsRef = baseRef.child('events');

var data = {
  meetups: [],
  sort: {
    asc: true,
    by: 'date'
  }
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  watchMeetups: function() {
    meetupsRef.on('value', this._updateMeetups);
  },

  _updateMeetups: function(meetupsObj) {

    var newMeetups = [];

    meetupsObj.forEach(function(meetupObj) {
      var meetup = meetupObj.val();
      meetup.id = meetupObj.key();
      newMeetups.push(meetup);
    });

    data.meetups = newMeetups;

    this.trigger(data);
  },

  getData: function() {
    return data;
  },

  addMeetup: function(newMeetup, callback) {
    var newRef = meetupsRef.push(newMeetup, function(err) {
      if (err) {
        console.log('error: ' + err);
        return;
      }
      Actions.hideModal();
    });

    if (callback) {
      callback(newRef.key());
    }
  },

  removeMeetup: function(meetupId) {
    meetupsRef.child(meetupId).remove(function(err) {
      if (err) {
        console.log('error: ' + err);
        return;
      }
    })
  },

});
