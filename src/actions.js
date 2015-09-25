var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'watchMeetups',
  'watchMeetup',
  'stopWatchMeetup',
  'deleteMeetup',

  // modal
  'showModal',
  'hideModal'
]);