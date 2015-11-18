var React = require('react'),
    classnames = require('classnames');

module.exports = React.createClass({

  _onLoad: function(e) {
    this.setState({
      loaded: true
    });
  },

  _onError: function(e) {
    this.setState({
      src: this.props.placeholder || ''
    });
  },

  getInitialState: function() {
    return {
      loaded: false,
      src: this.props.src
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        loaded: false,
        src: nextProps.src
      });
    }
  },

  render: function() {
    var className = classnames('image', this.state.loaded ? 'image-loaded' : null);
    console.log('image source: ' + this.state.src);
    return (
      <img
        className={className}
        onLoad={this._onLoad}
        onError={this._onError}
        src={this.state.src} />
    );
  }
});