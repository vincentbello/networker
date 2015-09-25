var Reflux = require('reflux'),
    Actions = require('../actions');

var data = {
  type: false
};

module.exports = Reflux.createStore({

  listenables: [Actions],

  showModal: function(type) {
    data.type = type;
    this.trigger(data);
  },

  hideModal: function() {
    data.type = false;
    this.trigger(data);
  },

  getDefaultData: function() {
    return data;
  }

})
