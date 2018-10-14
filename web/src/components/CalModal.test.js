import React from 'react';
import moment from 'moment';

import { PureCalModal as CalModal } from 'components/CalModal';
import { ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';


describe('<CalModal />', () => {
  const onToggle = jest.fn();
  const setLoading = jest.fn();
  const onChange = jest.fn();
  const onDateChange = jest.fn();
  const notify = jest.fn();
  const updateEvents = jest.fn();
  const startDate = moment('2018-10-13');
  const endDate = moment('2018-10-13').add(1, 'hours');
  const props = {
    isOpen: false,
    isLoading: false,
    onToggle,
    onChange,
    onDateChange,
    setLoading,
    updateEvents,
    notify,
    event: {
      _id: '',
      title: 'title',
      start_date: startDate,
      end_date: endDate,
    },
    events: [],
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<CalModal {...props} />);
    expect(wrapper.find(ModalDialog)).toHaveLength(1);
    expect(wrapper.find(ModalHeader)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
    expect(wrapper.find(ModalFooter)).toHaveLength(1);
  });

  it('events should be fired properly', () => {
    CalModal.prototype.onSubmit = jest.fn();
    CalModal.prototype.onDelete = jest.fn();
    CalModal.prototype.onUpdate = jest.fn();

    const wrapper = shallow(<CalModal {...props} />);
    wrapper.find('input#title').simulate('change');
    wrapper.find('Button.close-btn').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(CalModal.prototype.onSubmit).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      event: {
        ...props.event,
        _id: '_id',
      },
    });

    wrapper.find('Button.delete-btn').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(CalModal.prototype.onDelete).toHaveBeenCalledTimes(1);
    expect(CalModal.prototype.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = mount(<CalModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});


