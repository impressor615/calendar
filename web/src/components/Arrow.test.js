import React from 'react';

import Arrow from 'components/Arrow';


describe('<Arrow />', () => {
  const onClick = jest.fn();
  const props = {
    direction: 'previous',
    onClick,
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<Arrow {...props} />);
    expect(wrapper.find('button.arrow.previous')).toHaveLength(1);

    wrapper.setProps({
      direction: 'next',
    });
    expect(wrapper.find('button.arrow.next')).toHaveLength(1);
  });

  it('onClick shoule be called when clicking arrow button', () => {
    const wrapper = shallow(<Arrow {...props} />);
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  })

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<Arrow {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
});
