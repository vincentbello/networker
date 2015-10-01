var React = require('react'),
    Helpers = require('../utils/helpers'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    DayPicker = require('react-day-picker'),
    moment = require('moment'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Navigation
  ],

  _handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      saved: true
    });

    var newMeetup = {
      name: this.state.name.trim(),
      date: this.state.date,
      address: this.state.address,
      website: this.state.website,
      notes: this.state.notes
    };

    // if editing
    if (this.props.meetup) {
      Actions.editMeetup(this.props.meetup.id, newMeetup);
    } else {
      Actions.addMeetup(newMeetup, function(meetupId) {
        this.transitionTo('meetups/' + meetupId);
      });
    }
  },

  // _addMeetupCompleted: function(meetupId) {
  //   // clear form
  //   this.setState({
  //     saved: false,
  //     name: '',
  //     date: '',
  //     address: '',
  //     website: '',
  //     notes: ''
  //   });
  // },

  _handleNameChange: function(e) {
    this.setState({
      name: e.currentTarget.value
    });
  },

  _handleDateChange: function(e) {
    this.setState({
      date: e.currentTarget.value
    });
  },

  _handleDayPickerChange: function(e, day) {
    this.setState({
      date: day
    });
  },

  _handleAddressChange: function(e) {
    this.setState({
      address: e.currentTarget.value
    });
  },

  _handleWebsiteChange: function(e) {
    this.setState({
      website: e.currentTarget.value
    });
  },

  _handleNotesChange: function(e) {
    this.setState({
      notes: e.currentTarget.value
    });
  },

  // TODO: Get a JavaScript date picker
  getInitialState: function() {

    // if editing
    if (this.props.meetup) {
      return {
        saved: false,
        name: this.props.meetup.name || '',
        date: new Date(this.props.meetup.date) || new Date(),
        address: this.props.meetup.address || '',
        website: this.props.meetup.website || '',
        notes: this.props.meetup.notes || '',
      }
    }

    return {
      saved: false,
      name: '',
      date: new Date(),
      address: '',
      website: '',
      notes: '',
    };
  },

  componentWillReceiveProps: function(nextProps) {
  },

  render: function() {
    return (
      <div className="add-meetup">
        <h2>
          {this.props.meetup ? 'Edit' : 'Add'} Meetup
        </h2>
        {this._renderForm()}
      </div>
    );
  },

  _renderForm: function() {

    var selectedDay = this.state.date;
    var modifiers = {
      'selected': function(day) {
        return Helpers.isSameDay(selectedDay, day);
      }
    };

    // TODO: input classNames should change if invalid on form submit
    return (
      <form onSubmit={this._handleSubmit} className="add-form">
        <label htmlFor="add-meetup-name">Name</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-name"
          value={this.state.name}
          onChange={ this._handleNameChange }
        />
        <label htmlFor="add-meetup-date">Date</label>
        <DayPicker
          enableOutsideDays={ true }
          initialMonth={ this.state.date }
          modifiers={ modifiers }
          onDayClick={ this._handleDayPickerChange }
        />
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-date"
          value={ moment(this.state.date).format('MMMM D, YYYY') }
        />
        <label htmlFor="add-meetup-address">Address</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-address"
          value={this.state.address}
          onChange={ this._handleAddressChange }
        />
        <label htmlFor="add-meetup-website">Website</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-website"
          value={this.state.website}
          onChange={ this._handleWebsiteChange }
        />
        <label htmlFor="add-meetup-notes">Notes</label>
        <textarea
          className="add-form-input"
          id="add-meetup-notes"
          value={this.state.notes}
          onChange={ this._handleNotesChange }
        />
        <button
          type="submit"
          className="button button-primary" disabled={this.state.saved}>
          { this.state.saved ? <Spinner text='Adding...' /> : 'Save'}
        </button>
      </form>
    );



  }
});
