var React = require('react'),
    Actions = require('../actions'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  _handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      submitted: true
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

  // TODO: Get a JavaScript date picker
  getInitialState: function() {
    return {
      submitted: false,
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
          onChange={ function(e) { this.setState(name: e.target.value) } }
        />
        <label htmlFor="add-meetup-date">Date</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-date"
          value={this.state.date}
          onChange={ function(e) { this.setState(date: e.target.value) } }
        />
        <label htmlFor="add-meetup-location">Location</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-location"
          value={this.state.location}
          onChange={ function(e) { this.setState(location: e.target.value) } }
        />
        <label htmlFor="add-meetup-website">Website</label>
        <input
          type="text"
          className="add-form-input"
          id="add-meetup-website"
          value={this.state.website}
          onChange={ function(e) { this.setState(website: e.target.value) } }
        />
        <label htmlFor="add-meetup-notes">Notes</label>
        <textarea
          className="add-form-input"
          id="add-meetup-notes"
          value={this.state.notes}
          onChange={ function(e) { this.setState(notes: e.target.value) } }
        />
        <button
          type="submit"
          className="button button-primary" disabled={this.state.submitted}>
          { submitted ? <Spinner text='Adding...' /> : Submit}
        </button>
      </form>
    );



  }
});
