var React = require('react'),
    Actions = require('../actions'),
    Router = require('react-router'),
    Link = Router.Link;

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
            {this.props.connection.name}
          </td>
          <td>
            {this.props.connection.company.name}
          </td>
          <td>
            {this.props.connection.company.position}
          </td>
          <td>
            Contact info
          </td>
          <td>
            <i className="fa fa-pencil" onClick={this._editConnection}></i>
            <i className="fa fa-times" onClick={this._removeConnection}></i>
          </td>
        </tr>
    );
  }
});
