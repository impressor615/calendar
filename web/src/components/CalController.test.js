import React from 'react';

import CalController from 'components/CalController';


describe('<CalController />', () => {
  it('should be rendered properly', () => {
    const wrapper = shallow(<CalController />);
    expect(wrapper.find('.date-control')).toHaveLength(1);
    expect(wrapper.find('.date-control > button')).toHaveLength(2);
    expect(wrapper.find('.date-control .title')).toHaveLength(1);
    expect(wrapper.find('.type-control')).toHaveLength(1);
    expect(wrapper.find('.type-control > button')).toHaveLength(2);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = mount(<CalController />);
    expect(wrapper).toMatchSnapshot();
  })
})