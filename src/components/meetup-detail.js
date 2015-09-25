var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    MeetupDetailStore = require('../stores/meetup-detail');

var Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(MeetupDetailStore, 'onUpdate')
  ],

  getInitialState: function() {
    loading: true,
    meetup: null,
    editing: false
  },

  componentWillMount: function() {
    Actions.watchMeetup(this.props.params.meetupId);
  },

  // componentWillReceiveProps: function(nextProps) {

  //   if (nextProps.params.meetupId !== this.props.params.meetupId) {
  //     this.setState({
  //       loading: true
  //     });

  //     Actions.watchMeetup(nextProps.params.meetupId);
  //   }
  // }

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

    var inner;

    if (this.state.loading) {
      inner = (
        <Spinner />
      );
    } else {
      inner = (
        <div className="detail-meetup-info">
          {this.state.meetup.name}
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
