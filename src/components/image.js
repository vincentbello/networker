var React = require('react'),
    classnames = require('classnames');

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
    var className = classnames('image', this.state.loaded ? 'image-loaded' : null);

    return (
      <img
        className={className}
        onLoad={this._onLoad}
        src={this.props.src} />
    );
  }
});