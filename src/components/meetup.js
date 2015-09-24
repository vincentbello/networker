var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

  _handleSelect: function(event) {
    this.setState({
      selected: true
    })
  },

  getInitialState: function() {
    return {
      selected: false
    };
  },

  render: function() {
    return (
      <div className="meetup">
        <Link to={'meetups/' + this.props.meetup.id}
          activeClassName="selected"
          className="meetup-link"
          onClick={this._handleSelect}>
          <h5 className="meetup-list-name">{this.props.meetup.name}</h5>
          <div className="meetup-list-caption">{this.props.meetup.address}</div>
        </Link>
      </div>
    );
  }
});
