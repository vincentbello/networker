var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="spinner">
        <i className="fa fa-cog fa-spin fa-lg"></i>
        {this.props.text || 'Loading Meetups...'}
      </div>
    );
  }
});