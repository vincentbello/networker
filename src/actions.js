var Reflux = require('reflux');


module.exports = Reflux.createActions([
  'watchMeetups',
  'watchMeetup',
  'stopWatchMeetup',
  'addMeetup',
  'removeMeetup',

  // modal
  'showModal',
  'hideModal',

  // connections
  'watchConnections',
  'watchConnection',
  'addConnection',
  'removeConnection'
]);