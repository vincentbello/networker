var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    ConnectionsStore = require('../stores/connections-store'),
    Link = Router.Link,
    classnames = require('classnames');

var SubConnection = require('./subconnection'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ConnectionsStore, 'onChange')
  ],

// NO NEED TO WATCH, JUST LISTEN

  _handleSelect: function(event) {
    this.setState({
      selected: true
    });
  },

  onChange: function(dataObj) {
    this.setState({
      subConnections: dataObj.connections,
      loaded: true
    });
  },

  _containsChildConnection: function(childConnectionId) {

    var subConnections = this.state.subConnections;
    for (var i = 0, len = this.state.subConnections.length; i < len; i++) {
      if (subConnections[i].id === childConnectionId) {
        return true;
      }
    }
    return false;
  },

  getInitialState: function() {

    this.data = ConnectionsStore.getData();
    var meetupId = this.props.meetupId;

    return {
      selected: (meetupId && meetupId == this.props.meetup.id),
      subConnections: this.data.connections,
      loaded: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var meetupId = nextProps.meetupId, // From the params
        childConnectionId = nextProps.connectionId,
        isSelected = (meetupId && meetupId === this.props.meetup.id)
                  || (childConnectionId && this.state.selected);

    this.setState({
      selected: isSelected
    });
  },

  render: function() {

    var subConnectionList,
        subDisplay,
        meetupClassname = classnames('meetup', this.state.selected ? 'selected' : null);

    if (this.state.loaded && this.state.selected) {
      subConnectionList = this.state.subConnections.map(function(connection) {
        return (
          <SubConnection connection={connection} key={connection.id} />
        );
      });
      subDisplay = (
        <ul className="subconnection-list">
          <li className="list-header">
            Connections <i className="fa fa-angle-down"></i>
          </li>
          {subConnectionList}
        </ul>
      );
    } else if (this.state.selected) {
      subDisplay = (
        <Spinner text="Loading Connections..." />
      );
    }

    return (
      <div className={meetupClassname}>
        <Link to={'meetups/' + this.props.meetup.id}
          className="meetup-link"
          onClick={this._handleSelect}>
          <h5 className="meetup-list-name">{this.props.meetup.name}</h5>
          <div className="meetup-list-caption">{this.props.meetup.address}</div>
          <i className="fa fa-lg fa-angle-right"></i>
        </Link>
        {subDisplay}
      </div>
    );
  }
});
