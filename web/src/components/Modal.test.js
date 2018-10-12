import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter} from 'components/Modal';


describe('<Modal />', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = document.querySelector('body');
  body.appendChild(modalRoot);

  const onToggle = jest.fn();
  const props = {
    isOpen: true,
  };
  let wrapper;
  const component = (
    <Modal {...props}>
      <ModalHeader onToggle={onToggle}>
        일정 추가 및 수정
      </ModalHeader>
      <ModalBody>
        ModalBody
      </ModalBody>
      <ModalFooter>
        <button>취소</button> 
        <button>저장</button>
      </ModalFooter>
    </Modal>
  );

  afterEach(() => {
    wrapper.unmount();
  })

  it('shoud be matched with the snapshot', () => {
    wrapper = mount(component);
    expect(wrapper).toMatchSnapshot();
  })
});
