var React = require('react'),
    Header = require('./header'),
    MeetupList = require('./meetup-list'),
    EmptyDetail = require('./empty-detail');

// Will have header and left navigation menu.

module.exports = React.createClass({

  _detailContent: function() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <EmptyDetail />
      );
    }
  },

  render: function() {
    return (
      <div>
        <Header />
        <MeetupList />
        <div className="detail">
          {this._detailContent()}
        </div>
      </div>
    );
  }
});

