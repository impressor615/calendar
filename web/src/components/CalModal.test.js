import React from 'react';
import moment from 'moment';

import CalModal from 'components/CalModal';
import { ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';


describe('<CalModal />', () => {
  const onToggle = jest.fn();
  const onChange = jest.fn();
  const onDateChange = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();
  const onSubmit = jest.fn();
  const startDate = moment('2018-10-13');
  const endDate = moment('2018-10-13').add(1, 'hours');
  const props = {
    isOpen: false,
    isLoading: false,
    onToggle,
    onChange,
    onDateChange,
    onUpdate,
    onDelete,
    onSubmit,
    event: {
      _id: '',
      title: 'title',
      start_date: startDate,
      end_date: endDate,
    },
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<CalModal {...props} />);
    expect(wrapper.find(ModalDialog)).toHaveLength(1);
    expect(wrapper.find(ModalHeader)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
    expect(wrapper.find(ModalFooter)).toHaveLength(1);
  });

  it('events should be fired properly', () => {
    const wrapper = shallow(<CalModal {...props} />);
    wrapper.find('input#title').simulate('change');
    wrapper.find('button.close-btn').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      event: {
        ...props.event,
        _id: '_id',
      },
    });

    wrapper.find('button.delete-btn').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<CalModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});


