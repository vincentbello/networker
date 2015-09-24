var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="spinner">
        <span className="glyphicon glyphicon-refresh spinner-animate"></span>
      </div>
    );
  }
});