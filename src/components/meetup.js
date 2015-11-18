var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    Actions = require('../actions'),
    ConnectionsStore = require('../stores/connections-store'),
    ConnectionDetailStore = require('../stores/connection-detail-store'),
    Link = Router.Link,
    classnames = require('classnames');

var SubConnection = require('./subconnection'),
    Spinner = require('./spinner');

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ConnectionsStore, 'onChange'),
    Reflux.listenTo(ConnectionDetailStore, 'onConnectionLoad')
  ],

// NO NEED TO WATCH, JUST LISTEN

  onChange: function(dataObj) {
    this.setState({
      subConnections: dataObj.connections,
      loaded: true
    });
  },

  onConnectionLoad: function(dataObj) {
    if (this.state.selectedId !== dataObj.connection.meetupId) {

      Actions.watchConnections(dataObj.connection.meetupId);
      this.setState({
        selectedId: dataObj.connection.meetupId,
        loaded: true
      });
    }
  },

  _addConnection: function(e) {
    Actions.showModal('addConnection', { meetupId: this.props.meetupId });
  },

  getInitialState: function() {

    this.data = ConnectionsStore.getData();
    var meetupId = this.props.meetupId;

    return {
      selectedId: meetupId,
      subConnections: this.data.connections,
      loaded: false
    };
  },

  componentWillReceiveProps: function(nextProps) {

    // var meetupId = nextProps.meetupId, // From the params
    //     childConnectionId = nextProps.connectionId,
    //     isSelected = (meetupId && meetupId === this.props.meetup.id)
    //               || (this.props.meetupId && childConnectionId);

    //if (isSelected) {
    if (nextProps.meetupId || (this.props.meetupId && nextProps.connectionId)) {
      this.setState({
        selectedId: nextProps.meetupId || this.props.meetupId,
        loaded: (nextProps.connectionId || this.props.meetupId === nextProps.meetupId) ? true : false
      });
    }
    //}
  },

  render: function() {

    var subConnectionList,
        subDisplay,
        isSelected = (this.props.meetup.id == this.state.selectedId)
        meetupClassname = classnames('meetup', isSelected ? 'selected' : null);

    if (this.state.loaded && isSelected) {
      subConnectionList = this.state.subConnections.map(function(connection) {
        return (
          <SubConnection connection={connection} key={connection.id} />
        );
      });
      subDisplay = (
        <ul className="subconnection-list">
          <li className="list-header">
            Connections ({this.state.subConnections.length})
            <a onClick={this._addConnection}>
              <i className="fa fa-plus-circle"></i>
            </a>
          </li>
          {subConnectionList}
        </ul>
      );
    } else if (isSelected) {
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
