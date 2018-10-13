import React from 'react';

import Loading from 'components/Loading';
import Modal, { ModalDialog } from 'components/Modal';


describe('<Loading />', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = document.querySelector('body');
  body.appendChild(modalRoot);

  let wrapper;
  const props = {
    isOpen: true,
    children: 'Loading...' 
  };

  afterEach(() => {
    wrapper.unmount();
  })

  it('should be rendered properly', () => {
    wrapper = mount(<Loading {...props} />);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(ModalDialog)).toHaveLength(1);
    expect(wrapper.text()).toEqual(props.children);
  })

  it('shoud be matched with the snapshot', () => {
    wrapper = mount(<Loading {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
});

