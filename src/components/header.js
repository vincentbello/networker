var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="logo">
          <span>COOL TITLE</span>
        </div>
        <div className="search nav-component">
          <input type="text" placeholder="Search meetups, connections" />
        </div>
        <ul className="nav-list">
          <li><a href="#">MEETUPS</a></li>
          <li><a href="#">CONNECTIONS</a></li>
          <li><a href="#">{this.props.user.isLoggedIn ? this.props.user.firstName : 'Log in'}</a></li>
        </ul>
      </div>
    );
  }
});