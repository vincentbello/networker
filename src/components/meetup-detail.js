var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    marked = require('marked'),
    moment = require('moment'),
    MeetupDetailStore = require('../stores/meetup-detail-store');

var ConnectionList = require('./connection-list'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Navigation,
    Reflux.listenTo(MeetupDetailStore, 'onUpdate')
  ],

  _editMeetup: function(e) {
    Actions.showModal('addMeetup', { meetup: this.state.meetup });
  },

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
        <div className="detail-info">
          <div className="detail-header">
            <h3>{meetup.name}</h3>
            <a onClick={this._editMeetup}>
              <i className="fa fa-pencil icon-action"></i> Edit Meetup
            </a>
            <i className="fa fa-circle divider"></i>
            {this._renderRemove()}
          </div>
          <div className="detail-content">
            <div className="detail-meetup-event-details">
              <p>
                <i className="fa fa-calendar-check-o"></i> {moment(new Date(meetup.date)).format('MMMM D, YYYY')}
                <i className="fa fa-map-pin"></i> {meetup.address}
                <i className="fa fa-external-link"></i> <a href={meetup.website} target="_blank">Event Website</a>
              </p>
            </div>
            <div className="detail-meetup-desc">
              <h5>Notes</h5>
              <div dangerouslySetInnerHTML={this._renderNotes()} />
            </div>
            <div className="meetup-connections">
              <ConnectionList { ...this.props.params } />
            </div>
          </div>
        </div>
      );
    }

    return inner;
  },

  _renderNotes: function() {
    return { __html: marked(this.state.meetup.notes, { sanitize: true }) };
  },

  _renderRemove: function() {
    var confirm;

    if (this.state.removing) {
      confirm = (
        <span>
          <a className="link-danger" onClick={this._confirmRemoveMeetup}>Remove</a> - <a onClick={this._cancelRemove}>Cancel</a>
        </span>
      );
    } else {
      confirm = (
        <a onClick={this._removeMeetup}>
          <i className="fa fa-trash-o icon-action"></i> Remove Meetup
        </a>
      );
    }

    return (
      <span className="remove-meetup">
        {confirm}
      </span>
    );
  }
});
