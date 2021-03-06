var Reflux = require('reflux');


module.exports = Reflux.createActions([
  'watchMeetups',
  'watchMeetup',
  'stopWatchMeetup',
  'addMeetup',
  'editMeetup',
  'removeMeetup',

  // modal
  'showModal',
  'hideModal',

  // connections
  'watchConnections',
  'stopWatchConnections',
  'watchConnection',
  'addConnection',
  'editConnection',
  'removeConnection'
]);