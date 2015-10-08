var React = require('react'),
    Actions = require('../actions'),
    Router = require('react-router'),
    Link = Router.Link,
    Image = require('./image'),
    Constants = require('../utils/constants');

module.exports = React.createClass({

  _editConnection: function(e) {
    Actions.showModal('addConnection', { connection: this.props.connection });
  },

  _removeConnection: function(e) {
    Actions.removeConnection(this.props.connection.id);
  },

  render: function() {

    var img;

    if (this.props.connection.photo.length) {
      img = (
        <Image src={this.props.connection.photo} />
      );
    }

    return (
        <tr className="connection" key={this.props.key}>
          <td>
            {img}
          </td>
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
            <a onClick={this._editConnection} title="Edit Connection">
              <i className="fa fa-pencil"></i>
            </a>
            <a onClick={this._removeConnection} title="Remove Connection">
              <i className="fa fa-times"></i>
            </a>
          </td>
        </tr>
    );
  },

  _renderContactInfo: function() {

    var contact = this.props.connection.contact;
    return Object.keys(contact).map(function(contactType) {
      if (contact[contactType] && contact[contactType].length) {
        return (
          <i key={contactType} className={'fa fa-' + Constants.contactAttribs[contactType].iconClass}
              title={Constants.contactAttribs[contactType].name}
          ></i>
        );
      }
    });




  }
});
