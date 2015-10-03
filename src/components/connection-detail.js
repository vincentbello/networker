var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    ConnectionDetailStore = require('../stores/connection-detail-store'),
    Constants = require('../utils/constants');

var Image = require('./image'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Navigation,
    Reflux.listenTo(ConnectionDetailStore, 'onUpdate')
  ],

  _editConnection: function(e) {
    Actions.showModal('addConnection', { connection: this.state.connection });
  },

  _removeConnection: function(e) {
    this.setState({
      removing: true
    });
  },

  _confirmRemoveConnection: function(e) {
    Actions.removeConnection(this.state.connection.id);
  },

  _cancelRemove: function(e) {
    this.setState({
      removing: false
    });
  },

  getInitialState: function() {
    return {
      loading: true,
      connection: null,
      meetup: null,
      editing: false,
      removing: false
    };
  },

  componentWillMount: function() {
    Actions.watchConnection(this.props.params.connectionId);
  },

  componentWillReceiveProps: function(nextProps) {

    if (nextProps.params.connectionId !== this.props.params.connectionId) {
      this.setState({
        loading: true
      });

      Actions.stopWatchConnection(this.props.params.connectionId);
      Actions.watchConnection(nextProps.params.connectionId);
    }
  },

  // TODO: cleanup on componentDidUnmount, routerWillLeave

  onUpdate: function(connectionData) {
    if (!connectionData.connection) {
      this.transitionTo('/');
      return;
    }

    this.setState({
      loading: false,
      connection: connectionData.connection
    });
  },

  render: function() {
    return (
      <div className="detail-connection">
        {this._renderContent()}
      </div>
    );
  },

  _renderContent: function() {

    var connection = this.state.connection,
        inner;

    if (this.state.loading) {
      inner = (
        <Spinner text="Loading Connection..." />
      );
    } else {
      inner = (
        <div className="detail-connection-info">
          <Image src={connection.photo} />
          <h3>{connection.name}</h3>
          <i className="fa fa-pencil" onClick={this._editConnection}></i>
          <Image src={connection.company.logo} />
          <p><i class="fa fa-briefcase"></i> <em>{connection.company.position}</em> at <strong>{connection.company.name}</strong></p>
          <h5>Contact Information</h5>
          {this._renderContactInfo()}
          {this._renderRemove()}
        </div>
      );
    }

    return (
      <div className="detail-connection-content">
        {inner}
      </div>
    );
  },

  _renderContactInfo: function() {
    var contact = this.state.connection.contact;

    return Object.keys(contact).map(function(contactType) {
      if (contact[contactType] && contact[contactType].length) {

        var contactAttrib = Constants.contactAttribs[contactType],
            inner;

        switch(contactType) {
          case 'email':
            inner = (
              <a href={'mailto:' + contact[contactType]} target="_blank">{contact[contactType]}</a>
            );
            break;
          case 'facebook':
            inner = (
              <a href={contact[contactType]} target="_blank">{contact[contactType]}</a>
            );
            break;
          case 'twitter':
            inner = (
              <a href={'http://www.twitter.com/' + contact[contactType]} target="_blank">@{contact[contactType]}</a>
            );
            break;
          default:
            inner = contact[contactType];
        }

        return (
          <p><i className={'fa fa-' + contactAttrib.iconClass}></i> {contactAttrib.name}: {inner}</p>
        );
      }

    });
  },

  _renderRemove: function() {
    var confirm = '';

    if (this.state.removing) {
      confirm = (
        <span>
          <a onClick={this._confirmRemoveConnection}>Remove</a> - <a onClick={this._cancelRemove}>Cancel</a>
        </span>
      );
    }

    return (
      <p className="remove-connection">
        <a onClick={this._removeConnection}>
          <i className="fa fa-trash-o"></i> Remove Connection
        </a>
        {confirm}
      </p>
    );
  }
});
