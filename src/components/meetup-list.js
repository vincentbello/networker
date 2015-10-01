var React = require('react'),
    Reflux = require('reflux'),
    MeetupStore = require('../stores/meetup-store'),
    ModalStore = require('../stores/modal-store'),
    Actions = require('../actions'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    Meetup = require('./meetup'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(MeetupStore, 'onChange')
  ],

  _addMeetup: function(e) {
    Actions.showModal('addMeetup', {});
  },

  onChange: function(dataObj) {
    this.setState({
      meetups: dataObj.meetups,
      loaded: true
    });
  },

  getInitialState: function() {
    this.data = MeetupStore.getData();

    return {
      meetups: this.data.meetups,
      loaded: false
    };
  },

  componentWillMount: function() {
    Actions.watchMeetups();
  },

  render: function() {
    return (
      <div className="meetup-list">
        <h4 className="meetup-list-header">
          <a onClick={ this._addMeetup }>
            <i className="fa fa-plus-square-o"></i>
          </a>
          <i className="fa fa-calendar"></i>  Meetups
          <i className="fa fa-angle-down"></i>
        </h4>
        <div className="meetup-list-content">
          {this.state.loaded ? this._renderMeetups() : <Spinner />}
        </div>
      </div>
    );
  },

  _renderMeetups: function() {
    var meetups = this.state.meetups;

    if (!meetups.length) {
      return (
        <h4>You have not added any meetups yet.</h4>
      );
    }

    return meetups.map(function(meetup) {
      return (
        <Meetup meetup={meetup} key={meetup.id}>
        </Meetup>
      );
    });
  }
});