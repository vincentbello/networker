var React = require('react'),
    Actions = require('../actions'),
    LogoFinder = require('../utils/logo-finder'),
    Twitter = require('../utils/twitter'),
    Spinner = require('./spinner'),
    Image = require('./image');

module.exports = React.createClass({

  _handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      saved: true
    });

    var newConnection = {
      name: this.state.name.trim(),
      photo: this.state.photo,
      company: this.state.company,
      position: this.state.position,
      company: {
        name: this.state.company,
        position: this.state.position,
        logo: this.state.logo
      },
      contact: {
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        phone: this.state.phone,
        email: this.state.email
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

  _handleNameChange: function(e) {
    this.setState({
      name: e.currentTarget.value
    })
  },

  _handleCompanyChange: function(e) {
    this.setState({
      company: e.currentTarget.value
    })
  },

  _handlePositionChange: function(e) {
    this.setState({
      position: e.currentTarget.value
    })
  },

  _handleFacebookChange: function(e) {
    this.setState({
      facebook: e.currentTarget.value
    })
  },

  _handleTwitterChange: function(e) {
    this.setState({
      twitter: e.currentTarget.value
    })
  },

  _handlePhoneChange: function(e) {
    this.setState({
      phone: e.currentTarget.value
    })
  },

  _handleEmailChange: function(e) {
    this.setState({
      email: e.currentTarget.value
    })
  },

  getInitialState: function() {

    if (this.props.connection) {
      var connection = this.props.connection;

      return {
        saved: false,
        name: connection.name || '',
        photo: connection.photo || '',
        company: connection.company.name || '',
        position: connection.company.position || '',
        logo: connection.company.logo || '',
        facebook: connection.contact.facebook || '',
        twitter: connection.contact.twitter || '',
        phone: connection.contact.phone || '',
        email: connection.contact.email || ''
      };
    }

    return {
      saved: false,
      name: '',
      photo: 'img/photo_placeholder.png',
      company: '',
      position: '',
      logo: 'img/logo_placeholder.png',
      facebook: '',
      twitter: '',
      phone: '',
      email: ''
    };
  },

  render: function() {
    return (
      <div className="add-connection">
        <h2>
          {this.props.connection ? 'Edit' : 'Add'} Connection
        </h2>
        {this._renderForm()}
      </div>
    );
  },

  _renderForm: function() {
    return (
      <form onSubmit={this._handleSubmit} className="add-form">
        <label htmlFor="add-connection-name">Name</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-name"
          value={this.state.name}
          onChange={ this._handleNameChange }
        />
        <Image src={this.state.photo} />
        <label htmlFor="add-connection-company">Company</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-company"
          value={this.state.company}
          onChange={ this._handleCompanyChange }
          onBlur={ this._findLogo }
        />
        <Image src={this.state.logo} />
        <label htmlFor="add-connection-position">Position</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-position"
          value={this.state.position}
          onChange={ this._handlePositionChange }
        />
        <h4>Contact Information</h4>
        <label htmlFor="add-connection-facebook">Facebook</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-facebook"
          value={this.state.facebook}
          onChange={ this._handleFacebookChange }
        />
        <label htmlFor="add-connection-twitter">Twitter</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-twitter"
          value={this.state.twitter}
          onChange={ this._handleTwitterChange }
          onBlur={ this._findPhoto }
        />
        <label htmlFor="add-connection-phone">Phone</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-phone"
          value={this.state.phone}
          onChange={ this._handlePhoneChange }
        />
        <label htmlFor="add-connection-email">Email</label>
        <input
          type="text"
          className="add-form-input"
          id="add-connection-email"
          value={this.state.email}
          onChange={ this._handleEmailChange }
        />
        <button
          type="submit"
          className="button button-primary" disabled={this.state.saved}>
          {this.state.saved ? <Spinner text='Adding...' /> : 'Save'}
        </button>
      </form>
    );
  }
});
