var Reflux = require('reflux'),
    Firebase = require('firebase'),
    Actions = require('../actions'),
    firebaseUrl = require('../utils/constants').FIREBASE_URL;

var baseRef = new Firebase(firebaseUrl),
    meetupsRef = baseRef.child('events');

var data = {
  meetup: {}
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  watchMeetup: function(meetupId) {
    meetupsRef
        .child(meetupId)
        .on('value', this._updateMeetup.bind(this));
  },

  stopWatchMeetup: function(meetupId) {
    meetupsRef
        .child(meetupId)
        .off();
  },

  _updateMeetup: function(meetupData) {
    var meetup = meetupData.val();

    if (meetup) {
      meetup.id = meetupData.key();
      data.meetup = meetup;
    } else {
      data.meetup = null;
    }

    this.trigger(data);
  },

  deleteMeetup: function(meetupId) {
    meetupsRef
        .child(meetupId)
        .set({
          isDeleted: true
        });
  },

  getData: function() {
    return data;
  }

});