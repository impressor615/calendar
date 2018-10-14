import React from 'react';
import moment from 'moment';

import Arrow from 'components/Arrow';
import Button from 'components/Button';
import { PureCalController as CalController } from 'components/CalController';


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
    expect(wrapper.find(Arrow)).toHaveLength(2);
    expect(wrapper.find('.date-control .title')).toHaveLength(1);
    expect(wrapper.find('.type-control')).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('methods should be fired properly', () => {
    const wrapper = shallow(<CalController {...props} />);
    wrapper.find(Arrow).first().simulate('click');
    wrapper.find(Button).first().simulate('click');

    expect(onArrowClick).toHaveBeenCalledTimes(1);
    expect(onTypeChange).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = mount(<CalController {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
})