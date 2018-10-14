import React from 'react';
import moment from 'moment';

import Arrow from 'components/Arrow';
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

  let mountedWrapper;
  afterAll(() => {
    mountedWrapper.unmount();
  })

  it('should be rendered properly', () => {
    const wrapper = shallow(<CalController {...props} />);
    expect(wrapper.find('.date-control')).toHaveLength(1);
    expect(wrapper.find(Arrow)).toHaveLength(2);
    expect(wrapper.find('.date-control .title')).toHaveLength(1);
    expect(wrapper.find('.type-control')).toHaveLength(1);
    expect(wrapper.find('.type-control > button')).toHaveLength(2);
  });

  it('onClick event should be fired when button is clicked', () => {
    const wrapper = shallow(<CalController {...props} />);
    wrapper.find(Arrow).first().simulate('click');
    wrapper.find('.btn.primary').first().simulate('click');

    expect(onArrowClick).toHaveBeenCalledTimes(1);
    expect(onTypeChange).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    mountedWrapper = mount(<CalController {...props} />);
    expect(mountedWrapper).toMatchSnapshot();
  })
})