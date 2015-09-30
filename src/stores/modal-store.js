var Reflux = require('reflux'),
    Actions = require('../actions');

var data = {
  type: false,
  args: {}
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  showModal: function(type, args) {
    data.type = type;
    if (args) {
      data.args = args;
    }
    this.trigger(data);
  },

  hideModal: function() {
    data.type = false;
    this.trigger(data);
  },

  getData: function() {
    return data;
  }

})
