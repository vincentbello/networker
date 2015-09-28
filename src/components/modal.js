var React = require('react');

module.exports = React.createClass({

  render: function() {
    console.log('rendering modal');
    return (
      <div className="modal-background" onClick={this._dismiss}>
        <div className="modal-content" onClick={this._preventDismiss}>
          <a onClick={this._dismiss}>
            <i className="fa fa-times"></i> Dismiss
          </a>
          {this.props.children}
        </div>
      </div>
    );

  }



});