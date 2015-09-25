var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    MeetupDetailStore = require('../stores/meetup-detail-store');

var Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(MeetupDetailStore, 'onUpdate')
  ],

  getInitialState: function() {
    return {
      loading: true,
      meetup: null,
      editing: false
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
      console.log('error, wrong meetup!');
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
          <p><i className="fa fa-calendar-check-o fa-fw"></i> September 15, 2015</p>
          <p><i className="fa fa-map-pin fa-fw"></i> {meetup.address}</p>
          <p><i className="fa fa-external-link-square fa-fw"></i> <a href={meetup.website} target="_blank">Event Website</a></p>
          <div className="detail-meetup-desc">
            <h5>Notes</h5>
            {meetup.notes}
          </div>
        </div>
      );
    }

    return (
      <div className="detail-meetup-content">
        {inner}
      </div>
    );



  }
});
