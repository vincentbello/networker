var React = require('react');

module.exports = React.createClass({

  render: function() {

    return (
      <div className="modal-background" onClick={this._dismiss}>
        <div className="modal-content" onClick={this._preventDismiss}>
          <a href="#" onClick={this._dismiss}>
            <i className="fa fa-cross"></i> Dismiss
          </a>
          {this.props.children}
        </div>
      </div>
    );

  }



});