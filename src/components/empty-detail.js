var React = require('react'),
    MeetupDetail = require('./meetup-detail');


module.exports = React.createClass({

  render: function() {
    return (
      <div className="detail-empty">
        <h3>Welcome!</h3>
        <p>You can choose a meetup on the left to start.</p>
      </div>
    );
  }

});
