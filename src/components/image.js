var React = require('react');

module.exports = React.createClass({

  _onLoad: function(e) {
    console.log('loaded; state is ' + this.state.loaded);
    this.setState({
      loaded: true
    });
  },

  getInitialState: function() {
    return {
      loaded: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        loaded: false
      });
    }
  },

  render: function() {
    var className = 'image';
    if (this.state.loaded) {
      className += ' image-loaded';
    }

    return (
      <img
        className={className}
        onLoad={this._onLoad}
        src={this.props.src} />
    );




  }
});