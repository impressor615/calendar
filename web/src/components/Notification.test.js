import React from 'react';

import Notification from 'components/Notification';
import Modal, { ModalDialog, ModalBody } from 'components/Modal';


describe('<Notification />', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = document.querySelector('body');
  body.appendChild(modalRoot);

  let wrapper;
  const onToggle = jest.fn();
  const props = {
    type: 'danger',
    isOpen: true,
    message: 'error occurred' ,
    onToggle,
  };

  afterEach(() => {
    wrapper.unmount();
  });

  it('should be rendered properly', () => {
    wrapper = mount(<Notification {...props} />);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(ModalDialog)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
  });

  it('shoud be matched with the snapshot', () => {
    wrapper = mount(<Notification {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
});

