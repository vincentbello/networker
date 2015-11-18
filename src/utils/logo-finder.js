var Helpers = require('./helpers'),
    rootUrl = 'https://logo.clearbit.com/';

module.exports = {

  imageUrl: function(companyName) {
    return rootUrl + 'www.' + Helpers.removeAccents(companyName.toLowerCase().replace(/ /g,'')) + '.com';
  }
};