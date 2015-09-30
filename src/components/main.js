var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    Header = require('./header'),
    Modal = require('./modal'),
    MeetupList = require('./meetup-list'),
    AddMeetup = require('./add-meetup'),
    AddConnection = require('./add-connection'),
    EmptyDetail = require('./empty-detail'),
    ModalStore = require('../stores/modal-store');

// Will have header and left navigation menu.

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ModalStore, 'onModalUpdate')
  ],

  getInitialState: function() {
    return {
      modal: ModalStore.getData()
    }
  },

  onModalUpdate: function(modalData) {
    console.log('updating modal');
    this.setState({
      modal: modalData
    })
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
        <Header />
        <MeetupList />
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
      case 'addMeetup':
        modalContent = (<AddMeetup />);
        break;
      case 'addConnection':
        modalContent = (<AddConnection {...this.state.modal.args} />);
        break;
    }

    return (
      <Modal dismissModal={this._dismissModal}>
        {modalContent}
      </Modal>
    );
  }
});

