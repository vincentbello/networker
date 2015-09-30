var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    MeetupDetailStore = require('../stores/meetup-detail-store');

var ConnectionList = require('./connection-list'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Navigation,
    Reflux.listenTo(MeetupDetailStore, 'onUpdate')
  ],

  _removeMeetup: function(e) {
    this.setState({
      removing: true
    });
  },

  _confirmRemoveMeetup: function(e) {
    Actions.removeMeetup(this.state.meetup.id);
  },

  _cancelRemove: function(e) {
    this.setState({
      removing: false
    });
  },

  getInitialState: function() {
    return {
      loading: true,
      meetup: null,
      connections: [],
      editing: false,
      removing: false
    };
  },

  componentWillMount: function() {
    Actions.watchMeetup(this.props.params.meetupId);
  },

  componentWillReceiveProps: function(nextProps) {

    if (nextProps.params.meetupId !== this.props.params.meetupId) {
      this.setState({
        loading: true
      });

      Actions.stopWatchMeetup(this.props.params.meetupId);
      Actions.watchMeetup(nextProps.params.meetupId);
    }
  },

  // TODO: cleanup on componentDidUnmount, routerWillLeave

  onUpdate: function(meetupData) {
    if (!meetupData.meetup) {
      this.transitionTo('/');
      return;
    }

    this.setState({
      loading: false,
      meetup: meetupData.meetup
    });
  },

  render: function() {
    return (
      <div className="detail-meetup">
        {this._renderContent()}
      </div>
    );
  },

  _renderContent: function() {

    var meetup = this.state.meetup,
        inner;

    if (this.state.loading) {
      inner = (
        <Spinner />
      );
    } else {
      inner = (
        <div className="detail-meetup-info">
          <h3>{this.state.meetup.name}</h3>
          <p><i className="fa fa-calendar-check-o fa-fw"></i> {meetup.date}</p>
          <p><i className="fa fa-map-pin fa-fw"></i> {meetup.address}</p>
          <p><i className="fa fa-external-link-square fa-fw"></i> <a href={meetup.website} target="_blank">Event Website</a></p>
          <div className="detail-meetup-desc">
            <h5>Notes</h5>
            {meetup.notes}
          </div>
          <div className="meetup-connections">
            <ConnectionList { ...this.props.params } />
          </div>
          {this._renderRemove()}
        </div>
      );
    }

    return (
      <div className="detail-meetup-content">
        {inner}
      </div>
    );
  },

  _renderRemove: function() {
    var confirm = '';

    if (this.state.removing) {
      confirm = (
        <span>
          <a onClick={this._confirmRemoveMeetup}>Remove</a> - <a onClick={this._cancelRemove}>Cancel</a>
        </span>
      );
    }

    return (
      <p className="remove-meetup">
        <a onClick={this._removeMeetup}>
          <i className="fa fa-trash-o"></i> Remove Meetup
        </a>
        {confirm}
      </p>
    );
  }
});
