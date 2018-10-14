import React from 'react';

import Button from 'components/Button';


describe("<Button />", () => {
  const onClick = jest.fn();
  const props = {
    children: 'button',
    active: false,
    onClick,
  };

  it('should be rendered properly based on its props', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('.btn')).toHaveLength(1);
    expect(wrapper.find('.btn').text()).toEqual(props.children);

    wrapper.setProps({ active: true });
    expect(wrapper.find('.btn.active')).toHaveLength(1);

    wrapper.setProps({ color: 'primary' });
    expect(wrapper.find('.btn.primary')).toHaveLength(1);

    wrapper.setProps({ color: 'secondary' });
    expect(wrapper.find('.btn.secondary')).toHaveLength(1);
  });

  it('onClick should be called when clicking the button', () => {
    const wrapper = shallow(<Button {...props} />);
    wrapper.find('.btn').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
