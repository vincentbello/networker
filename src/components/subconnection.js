var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

  render: function() {
    var connection = this.props.connection;

    return (
      <li className="subconnection">
        <Link to={'connections/' + connection.id}
          activeClassName="selected">
          {connection.name}
          <i className="fa fa-angle-right"></i>
        </Link>
      </li>
    );




  }
});