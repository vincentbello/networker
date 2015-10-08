var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Navigation = require('react-router').Navigation,
    ConnectionDetailStore = require('../stores/connection-detail-store'),
    Constants = require('../utils/constants'),
    marked = require('marked'),
    classnames = require('classnames');

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

//      Actions.stopWatchConnection(this.props.params.connectionId);
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

    var inner;

    if (this.state.loading) {
      inner = (
        <Spinner text="Loading Connection..." />
      );
    } else {

      var connection = this.state.connection,
          photo = connection.photo.length ? (<Image src={connection.photo} />) : undefined,
          logo = connection.company.logo.length ? (<Image src={connection.company.logo} />) : undefined,
          companyClassname = classnames('company-info', connection.company.logo.length ? null : 'no-logo');

      inner = (

        <div className="detail-info">
          <div className="detail-header">
            <h3>
              {photo}
              {connection.name}
            </h3>
            <a onClick={this._editConnection}>
              <i className="fa fa-pencil icon-action"></i> Edit Connection
            </a>
            <i className="fa fa-circle divider"></i>
            {this._renderRemove()}
          </div>
          <div className="detail-content">
            <div className={companyClassname}>
              {logo}
              <p className="company-info-attribute position">
                {connection.company.position}
              </p>
              <p className="company-info-attribute company">
                {connection.company.name}
              </p>
              <p className="company-info-attribute location">
                <i className="fa fa-map-pin"></i> {connection.company.location}
              </p>
            </div>
            <div>
              <i className="fa fa-graduation-cap"></i> {connection.education}
            </div>
            <h5>Contact Information</h5>
            {this._renderContactInfo()}
            <h5>Impressions</h5>
            {this._renderImpressions()}
          </div>
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
          case 'facebook', 'linkedin':
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
          <p><i className={'fa fa-fw fa-2x fa-' + contactAttrib.iconClass}></i> {contactAttrib.name}: {inner}</p>
        );
      }

    });
  },

  _renderImpressions: function() {

    var impressionsElem;

    if (this.state.connection.impressions) {
      var html = { __html: marked(this.state.connection.impressions, { sanitize: true }) };
      return (
        <div key="impressionsHtml" dangerouslySetInnerHTML={html} />
      );
    }

    // When React removes div.info, it sets (replaces) the _html before the queued removal happens. When the queue is processed, the element is missing.
    // We would have to queue the dangerouslySetInnerHTML as well.
    // Workaround: we set different key props to the divs, so that React creates a new element instead of reusing the existing one.

    return (
      <div className="info" key="info">
        What did you think about {this.state.connection.name}? Record your impressions <a onClick={this._editConnection}>here</a>.
      </div>
    );
  },

  _renderRemove: function() {
    var name = this.state.connection.name,
        confirm;

    if (this.state.removing) {
      confirm = (
        <span>
          <a className="link-danger" onClick={this._confirmRemoveConnection}>Remove {name}</a> - <a onClick={this._cancelRemove}>Cancel</a>
        </span>
      );
    } else {
      confirm = (
        <a onClick={this._removeConnection}>
          <i className="fa fa-trash-o icon-action"></i> Remove Connection
        </a>
      );
    }

    return (
      <span className="remove-connection">
        {confirm}
      </span>
    );
  }
});
