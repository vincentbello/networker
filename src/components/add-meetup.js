var React = require('react/addons'),
    Helpers = require('../utils/helpers'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    DayPicker = require('react-day-picker'),
    moment = require('moment'),
    classnames = require('classnames'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Navigation,
    React.addons.LinkedStateMixin
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

  _handleDayPickerChange: function(e, day) {
    this.setState({
      date: day,
      datePicking: false
    });
  },

  _revealDatePicker: function(e) {
    this.setState({
      datePicking: !this.state.datePicking
    })
  },

  _hideDatePicker: function(e) {
    this.setState({
      datePicking: false
    });
  },

  _preventHideDatePicker: function(e) {
    e.stopPropagation();
  },

  // TODO: Get a JavaScript date picker
  getInitialState: function() {

    // if editing
    if (this.props.meetup) {
      return {
        saved: false,
        datePicking: false,
        name: this.props.meetup.name || '',
        date: new Date(this.props.meetup.date) || new Date(),
        address: this.props.meetup.address || '',
        website: this.props.meetup.website || '',
        notes: this.props.meetup.notes || '',
      }
    }

    return {
      saved: false,
      datePicking: false,
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
      <div className="add-meetup" onClick={this._hideDatePicker}>
        <div className="modal-header">
          <div className="modal-header-title">
            {this.props.meetup ? 'Editing' : 'New'} Meetup
          </div>
          <h2>{this.state.name}</h2>
        </div>
        {this._renderForm()}
      </div>
    );
  },

  _renderForm: function() {

    var selectedDay = this.state.date,
        dayPickerClassName = classnames('day-picker', this.state.datePicking ? null : 'collapsed'),
        formInput = classnames('add-form-input', this.state.datePicking ? 'flat-bottom' : null),
        modifiers = {
      'selected': function(day) {
        return Helpers.isSameDay(selectedDay, day);
      }
    };

    // TODO: input classNames should change if invalid on form submit
    return (
      <form onSubmit={this._handleSubmit} className="add-form modal-form">
        <div className="form-group">
          <label htmlFor="add-meetup-name">Name</label>
          <input
            type="text"
            className="add-form-input"
            id="add-meetup-name"
            autoFocus={true}
            valueLink={this.linkState('name')}
          />
        </div>
        <div className="form-group" onClick={this._preventHideDatePicker}>
          <label htmlFor="add-meetup-date">Date</label>
          <input
            type="text"
            className={formInput}
            id="add-meetup-date"
            readOnly={true}
            onFocus={this._revealDatePicker}
            value={ moment(this.state.date).format('MMMM D, YYYY') }
          />
          <a onClick={this._revealDatePicker}>
            <i className="fa fa-calendar"></i>
          </a>
          <DayPicker
            className={dayPickerClassName}
            enableOutsideDays={ true }
            initialMonth={ this.state.date }
            modifiers={ modifiers }
            onDayClick={ this._handleDayPickerChange }
          />
        </div>
        <div className="form-group">
          <label htmlFor="add-meetup-address">Location</label>
          <input
            type="text"
            className="add-form-input"
            id="add-meetup-address"
            valueLink={this.linkState('address')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="add-meetup-website">Website</label>
          <input
            type="text"
            className="add-form-input"
            id="add-meetup-website"
            valueLink={this.linkState('website')}
          />
        </div>
        <label htmlFor="add-meetup-notes">Notes</label>
        <textarea
          className="add-form-input lg"
          id="add-meetup-notes"
          rows="4"
          valueLink={this.linkState('notes')}
        />
        <div className="centered">
          <button
            type="submit"
            className="button button-primary" disabled={this.state.saved}>
            { this.state.saved ? <Spinner text='Adding...' /> : 'Save'}
          </button>
        </div>
      </form>
    );



  }
});
