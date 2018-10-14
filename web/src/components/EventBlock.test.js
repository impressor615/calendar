import React from 'react';

import Button from 'components/Button';
import EventBlock from 'components/EventBlock';


describe("<EventBlock />", () => {
  const onToggle = jest.fn();
  const onDragStart = jest.fn();
  const props = {
    children: '09:00 Schedule1',
    fluid: false,
    onToggle,
    onDragStart,
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<EventBlock {...props} />);
    expect(wrapper.find('.event-block')).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);

    wrapper.setProps({ fluid: true });
    expect(wrapper.find('.event-block.fluid')).toHaveLength(1);
  });

  it('methods should be called when clicking the EventBlock', () => {
    const wrapper = shallow(<EventBlock {...props} />);
    wrapper.find(Button).simulate('click');
    wrapper.find(Button).simulate('dragstart');
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onDragStart).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<EventBlock {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
