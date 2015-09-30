var React = require('react'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
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

    Actions.addMeetup(newMeetup, function(meetupId) {
      this.transitionTo('meetups/' + meetupId);
    });
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
    return {
      saved: false,
      name: '',
      date: '',
      address: '',
      website: '',
      notes: ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
  },

  render: function() {
    return (
      <div className="add-meetup">
        <h2>Add Meetup</h2>
        {this._renderForm()}
      </div>
    );
  },

  _renderForm: function() {

    // TODO: input classNames should change if invalid on form submit
    // TODO: add markdown support to notes textarea
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
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-date"
          value={this.state.date}
          onChange={ this._handleDateChange }
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
