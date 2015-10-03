var React = require('react'),
    Reflux = require('reflux'),
    ConnectionsStore = require('../stores/connections-store'),
    Actions = require('../actions'),
    Connection = require('./connection');

var Connection = require('./connection'),
    Spinner = require('./spinner');


module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ConnectionsStore, 'onChange')
  ],

  _addConnection: function(e) {
    Actions.showModal('addConnection', { meetupId: this.props.meetupId });
  },

  onChange: function(dataObj) {
    this.setState({
      connections: dataObj.connections,
      loaded: true
    });
  },

  getInitialState: function() {
    this.data = ConnectionsStore.getData();

    return {
      connections: this.data.connections,
      loaded: false
    };
  },

  componentWillMount: function() {
    Actions.watchConnections(this.props.meetupId);
  },

  render: function() {
    return (
      <div className="connections-list">
        <h4>Connections</h4>
        <span className="fa-stack fa-1x" onClick={this._addConnection}>
          <i className="fa fa-circle-thin fa-stack-2x"></i>
          <i className="fa fa-plus fa-stack-1x"></i>
        </span>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Position</th>
              <th>Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.loaded ? this._renderConnections() : ''}
          </tbody>
        </table>
      </div>
    );
  },

  _renderConnections: function() {
    var connections = this.state.connections;

    if (!connections.length) {
      return (
        <p>You have not added any connections yet.</p>
      );
    }

    return connections.map(function(connection) {
      return (
        <Connection connection={connection} key={connection.id}>
        </Connection>
      );
    });
  }
});
