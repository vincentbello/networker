var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

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
            <i className="fa fa-pencil"></i>
            <i className="fa fa-times"></i>
          </td>
        </tr>
    );
  }
});
