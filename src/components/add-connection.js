var React = require('react/addons'),
    Actions = require('../actions'),
    Constants = require('../utils/constants'),
    LogoFinder = require('../utils/logo-finder'),
    Twitter = require('../utils/twitter'),
    Spinner = require('./spinner'),
    Image = require('./image');

module.exports = React.createClass({

  mixins: [
    React.addons.LinkedStateMixin
  ],

  _handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      saved: true
    });

    var newConnection = {
      name: this.state.name.trim(),
      photo: this.state.photo,
      education: this.state.education,
      impressions: this.state.impressions,
      company: {
        name: this.state.company,
        position: this.state.position,
        location: this.state.location,
        logo: this.state.logo
      },
      contact: {
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        twitter: this.state.twitter,
        phone: this.state.phone,
        email: this.state.email,
        skype: this.state.skype
      }
    };

    if (this.props.connection) {
      Actions.editConnection(this.props.connection.id, newConnection);
    } else {
      newConnection.meetupId = this.props.meetupId;
      Actions.addConnection(newConnection);
    }
  },

  _findLogo: function(e) {
    if (this.state.company.length) {
      this.setState({
        logo: LogoFinder.imageUrl(this.state.company)
      });
    }
  },

  _findPhoto: function(e) {
    if (this.state.twitter.length) {
      var self = this;
      Twitter.imageFromHandle(this.state.twitter)
          .then(function(json) {
            self.setState({
              photo: json.imageUrl
            });
          });
    }
  },

  getInitialState: function() {

    if (this.props.connection) {
      var connection = this.props.connection;

      return {
        saved: false,
        name: connection.name                 || '',
        photo: connection.photo               || '',
        education: connection.education       || '',
        impressions: connection.impressions   || '',
        company: connection.company.name      || '',
        position: connection.company.position || '',
        location: connection.company.location || '',
        logo: connection.company.logo         || '',
        facebook: connection.contact.facebook || '',
        linkedin: connection.contact.linkedin || '',
        twitter: connection.contact.twitter   || '',
        phone: connection.contact.phone       || '',
        email: connection.contact.email       || '',
        skype: connection.contact.skype       || ''
      };
    }

    return {
      saved: false,
      name: '',
      photo: '',
      education: '',
      impressions: '',
      company: '',
      position: '',
      location: '',
      logo: 'public/img/logo_placeholder.png',
      facebook: '',
      linkedin: '',
      twitter: '',
      phone: '',
      email: '',
      skype: '',
    };
  },

  render: function() {
    return (
      <div className="add-connection">
        <div className="modal-header">
          <div className="modal-header-title">
            {this.props.connection ? 'Edit' : 'Add'} Connection
          </div>
          <h2>{this.state.name}</h2>
        </div>
        {this._renderForm()}
      </div>
    );
  },

  _renderForm: function() {

    var photoPath = this.state.photo.length ? this.state.photo : Constants.PHOTO_PLACEHOLDER,
        logoPath = this.state.logo.length ? this.state.logo : Constants.LOGO_PLACEHOLDER;

    return (
      <form onSubmit={this._handleSubmit} className="add-form modal-form">
        <div className="row">
          <div className="two columns">

            <Image src={photoPath} />
          </div>
          <div className="ten columns">
            <label htmlFor="add-connection-name">Name</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-name"
              autoFocus={true}
              valueLink={this.linkState('name')}
            />
          </div>
        </div>
        <div className="row">
          <div className="two columns">

            <Image src={logoPath} />
          </div>
          <div className="ten columns">
            <label htmlFor="add-connection-company">Company</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-company"
              valueLink={this.linkState('company')}
              onBlur={ this._findLogo }
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-connection-position">Position</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-position"
              valueLink={this.linkState('position')}
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-connection-location">Location</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-location"
              valueLink={this.linkState('location')}
            />
          </div>
        </div>
        <label htmlFor="add-connection-impressions">Impressions</label>
        <textarea
          className="add-form-input"
          id="add-connection-impressions"
          valueLink={this.linkState('impressions')}
        />
        <label htmlFor="add-connection-education">Education</label>
        <textarea
          className="add-form-input"
          id="add-connection-education"
          valueLink={this.linkState('education')}
        />
        <h4>Contact Information</h4>
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-connection-facebook">Facebook</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-facebook"
              valueLink={this.linkState('facebook')}
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-connection-linkedin">LinkedIn</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-linkedin"
              valueLink={this.linkState('linkedin')}
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-connection-twitter">Twitter</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-twitter"
              valueLink={this.linkState('twitter')}
              onBlur={ this._findPhoto }
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-connection-phone">Phone</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-phone"
              valueLink={this.linkState('phone')}
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-connection-email">Email</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-email"
              valueLink={this.linkState('email')}
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-connection-skype">Skype</label>
            <input
              type="text"
              className="add-form-input"
              id="add-connection-skype"
              valueLink={this.linkState('skype')}
            />
          </div>
        </div>
        <div className="centered">
          <button
            type="submit"
            className="button button-primary" disabled={this.state.saved}>
            {this.state.saved ? <Spinner text='Adding...' /> : 'Save'}
          </button>
        </div>
      </form>
    );
  }
});
