var React = require('react'),
    Actions = require('../actions'),
    Router = require('react-router'),
    Link = Router.Link,
    Constants = require('../utils/constants');

module.exports = React.createClass({

  _editConnection: function(e) {
    Actions.showModal('addConnection', { connection: this.props.connection });
  },

  _removeConnection: function(e) {
    Actions.removeConnection(this.props.connection.id);
  },

  render: function() {
    return (
        <tr className="connection">
          <td>
            <Link to={'connections/' + this.props.connection.id}>
              {this.props.connection.name}
            </Link>
          </td>
          <td>
            {this.props.connection.company.name}
          </td>
          <td>
            {this.props.connection.company.position}
          </td>
          <td>
            {this._renderContactInfo()}
          </td>
          <td>
            <i className="fa fa-pencil" onClick={this._editConnection}></i>
            <i className="fa fa-times" onClick={this._removeConnection}></i>
          </td>
        </tr>
    );
  },

  _renderContactInfo: function() {

    var contact = this.props.connection.contact;
    return Object.keys(contact).map(function(contactType) {
      if (contact[contactType] && contact[contactType].length) {
        return (
          <i className={'fa fa-' + Constants.contactAttribs[contactType].iconClass}></i>
        );
      }
    });




  }
});
