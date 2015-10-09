var React = require('react'),
    Constants = require('../utils/constants');

var elements = {
  date: 'Date',
  name: 'Name',
  location: 'Location'
};

var selected = 'name';

module.exports = React.createClass({

  _handleSelect: function(e) {
    console.log('selected');
    console.log(e);
  },

  render: function() {
    return (
      <ul className="dropdown">
        {this._renderElements()}
      </ul>
    );
  },

  _renderElements: function() {
    var handleSelect = this._handleSelect;
    return Object.keys(elements).map(function(key) {
      return (
        <li key={key} onClick={handleSelect} className={key == selected ? 'selected' : ''}>
          {elements[key]}
        </li>
      );
    });
  }
});
