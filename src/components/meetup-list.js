var React = require('react'),
    Reflux = require('reflux'),
    MeetupStore = require('../stores/meetup-store'),
    ModalStore = require('../stores/modal-store'),
    Actions = require('../actions'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    Meetup = require('./meetup'),
    SortDropdown = require('./sort-dropdown'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(MeetupStore, 'onChange')
  ],

  _addMeetup: function(e) {
    Actions.showModal('addMeetup', {});
  },

  _toggleSort: function(e) {
    this.setState({
      sorting: !this.state.sorting
    });
  },

  onChange: function(dataObj) {
    this.setState({
      meetups: dataObj.meetups,
      sort: dataObj.sort,
      sorting: false,
      loaded: true
    });
  },

  getInitialState: function() {
    this.data = MeetupStore.getData();

    return {
      meetups: this.data.meetups,
      sort: this.data.sort,
      sorting: false,
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
            <i className="fa fa-plus-circle" title="Add a Meetup"></i>
          </a>
          <span className="meetup-list-title">
            <i className="fa fa-calendar"></i>  Meetups
          </span>
          <span className="dropdown-wrapper">
            <a onClick={this._toggleSort}>
              <i className="fa fa-caret-down"></i>
            </a>
            {this.state.sorting ? this._renderSortDropdown() : ''}
          </span>
        </h4>
        <div className="meetup-list-content">
          {this.state.loaded ? this._renderMeetups() : <Spinner />}
        </div>
      </div>
    );
  },

  _renderMeetups: function() {
    var meetups = this.state.meetups,
        params = this.props.params;

    if (!meetups.length) {
      return (
        <h4>You have not added any meetups yet.</h4>
      );
    }

    return meetups.map(function(meetup) {
      return (
        <Meetup meetup={meetup} key={meetup.id} {...params} />
      );
    });
  },

  _renderSortDropdown: function() {
    return (
      <SortDropdown currentSort={this.state.sort} />
    );
  }


});