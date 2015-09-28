var Reflux = require('reflux');


module.exports = Reflux.createActions([
  'watchMeetups',
  'watchMeetup',
  'stopWatchMeetup',
  'addMeetup',
  'deleteMeetup',

  // modal
  'showModal',
  'hideModal'
]);