var React = require('react'),
    Header = require('./header'),
    MeetupList = require('./meetup-list'),
    EmptyDetail = require('./empty-detail'),
    ModalStore = require('../stores/modal-store');

// Will have header and left navigation menu.

module.exports = React.createClass({

  mixins: [
    Reflux.listenTo(ModalStore), 'onModalUpdate'
  ],

  getInitialState: function() {
    return {
      modal: ModalStore.getDefaultData()
    }
  },

  onModalUpdate: function(modalData) {
    this.setState({
      modal: modalData
    })
  },

  // hideModal: function(e) {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   Actions.hide
  // }

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

    var modalContent = ();

    switch (this.state.modal.type) {
      case 'addMeetup':
        modalContent = (<NewMeetup />);
      case 'addConnection':
        modalContent = (<NewConnection />);
    }

    return (
      <Modal>
        {modalContent}
      </Modal>
    );
  }
});

