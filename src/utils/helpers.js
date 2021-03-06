var Constants = require('./constants');

module.exports = {

  removeAccents: function(str) {
    var accentsMap = Constants.accentsMap,
        i,
        mlen = accentsMap.length;
    for (i = 0; i < mlen; i++) {
      str = str.replace(accentsMap[i].letters, accentsMap[i].base);
    }
    return str;
  },

  isSameDay: function(d1, d2) {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  },

};