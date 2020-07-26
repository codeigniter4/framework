import React, { Component, createContext } from 'react';
export const ModalContext = createContext();

class ModalContextProvider extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(open) {
    this.setState({
      openModal: open
    });
  }

  render() {
    return (
      <ModalContext.Provider
        value={{...this.state,
          toggleModal: this.toggleModal
        }
      }>
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export default ModalContextProvider;
