import React from 'react';
import moment from 'moment';

import CalController from 'components/CalController';


describe('<CalController />', () => {
  const onArrowClick = jest.fn();
  const onTypeChange = jest.fn();
  const defaultDate = moment('2018-10-13');
  const props = {
    currentDate: defaultDate,
    type: 'months',
    onArrowClick,
    onTypeChange,
  };
  it('should be rendered properly', () => {
    const wrapper = shallow(<CalController {...props} />);
    expect(wrapper.find('.date-control')).toHaveLength(1);
    expect(wrapper.find('.date-control > button')).toHaveLength(2);
    expect(wrapper.find('.date-control .title')).toHaveLength(1);
    expect(wrapper.find('.type-control')).toHaveLength(1);
    expect(wrapper.find('.type-control > button')).toHaveLength(2);
  });

  it('onClick event should be fired when button is clicked', () => {
    const wrapper = shallow(<CalController {...props} />);
    wrapper.find('.btn.arrow').first().simulate('click');
    wrapper.find('.btn.primary').first().simulate('click');

    expect(onArrowClick).toHaveBeenCalledTimes(1);
    expect(onTypeChange).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = mount(<CalController {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
})