var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="meetup">
        <h5>{this.props.meetup.name}</h5>
        <div>{this.props.meetup.address}</div>
      </div>
    );
  }
});
