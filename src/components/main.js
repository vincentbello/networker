var React = require('react'),
    Header = require('./header'),
    MeetupList = require('./meetup-list');

// Will have header and left navigation menu.

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <MeetupList />
      </div>
    );
  }
});

