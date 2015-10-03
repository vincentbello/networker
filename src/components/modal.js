var React = require('react');

module.exports = React.createClass({

  _preventDismiss: function(e) {
    e.stopPropagation();
  },

  render: function() {
    console.log('rendering modal');
    return (
      <div className="modal-background" onClick={this.props.dismissModal}>
        <div className="modal-content" onClick={this._preventDismiss}>
          <a onClick={this.props.dismissModal}>
            <i className="fa fa-times"></i>
          </a>
          {this.props.children}
        </div>
      </div>
    );

  }



});