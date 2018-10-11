import React from 'react';
import Calendar from 'components/Calendar';


describe('<Calendar />', () => {
  const props = {
    type: 'month',
    range: [
      30, 1, 2, 3, 4, 5, 6,
      7, 8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 1, 2, 3
    ],
  }
  it('should be matched with the snapshot', () => {
    const wrapper = mount(<Calendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

