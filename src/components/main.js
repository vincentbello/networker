var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Header = require('./header'),
    Modal = require('./modal'),
    MeetupList = require('./meetup-list'),
    Register = require('./register'),
    Login = require('./login'),
    AddMeetup = require('./add-meetup'),
    AddConnection = require('./add-connection'),
    EmptyDetail = require('./empty-detail'),
    ModalStore = require('../stores/modal-store'),
    UserStore = require('../stores/user-store');

// Will have header and left navigation menu.

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ModalStore, 'onModalUpdate'),
    Reflux.listenTo(UserStore, 'onUserUpdate')
  ],

  getInitialState: function() {
    return {
      modal: ModalStore.getData(),
      user: UserStore.getData()
    }
  },

  onModalUpdate: function(modalData) {
    this.setState({
      modal: modalData
    })
  },

  onUserUpdate: function(userData) {
    this.setState({
      user: user
    });
  },

  _dismissModal: function(e) {
    if (e) {
      e.preventDefault();
    }
    Actions.hideModal();
  },

  _detailContent: function() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <EmptyDetail />
      );
    }
  },

  render: function() {
    return (
      <div>
        <Header user={this.state.user} />
        <MeetupList {...this.props} />
        <div className="detail">
          {this._detailContent()}
        </div>
        {this._renderModal()}
      </div>
    );
  },

  _renderModal: function() {
    if (!this.state.modal.type) {
      return;
    }

    var modalContent;
    switch (this.state.modal.type) {
      case 'register':
        modalContent = (<Register user={this.state.user} />);
        break;
      case 'login':
        modalContent = (<Login user={this.state.user} />);
        break;
      case 'addMeetup':
        modalContent = (<AddMeetup {...this.state.modal.args} user={this.state.user} />);
        break;
      case 'addConnection':
        modalContent = (<AddConnection {...this.state.modal.args} user={this.state.user} />);
        break;
    }

    return (
      <Modal dismissModal={this._dismissModal}>
        {modalContent}
      </Modal>
    );
  }
});

