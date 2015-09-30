var rootUrl = 'https://logo.clearbit.com/';

module.exports = {

  imageUrl: function(companyName) {
    return rootUrl + 'www.' + companyName.toLowerCase().replace(/ /g,'') + '.com';
  }
}