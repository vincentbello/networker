var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="detail-meetup">
        {'showing detail for meetup ' + this.props.params.meetupId}
      </div>
    );
  }
});
