var React = require('react'),
    Actions = require('../actions'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  _handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      saved: true
    });

    var newMeetup = {
      name: this.state.name.trim(),
      date: this.state.date,
      location: this.state.location,
      website: this.state.website,
      notes: this.state.notes
    };

    Actions.addMeetup(newMeetup);
  },

  _handleNameChange: function(e) {
    this.setState({
      name: e.currentTarget.value
    });
  },

  _handleLocationChange: function(e) {
    this.setState({
      location: e.currentTarget.value
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
      location: '',
      website: '',
      notes: ''
    };
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
        <label htmlFor="add-meetup-location">Location</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-location"
          value={this.state.location}
          onChange={ this._handleLocationChange }
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
