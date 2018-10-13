import React from 'react';

import Calendar, { MonthCalendar, WeekCalendar, CalendarDay, CalendarTime } from 'components/Calendar';


describe('<Calendar />', () => {
  const onToggle = jest.fn();
  const weekRange = [30, 1, 2, 3, 4, 5, 6];
  const monthRange = [
    30, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31, 1, 2, 3
  ];
  let wrapper;
  const props = {
    type: 'month',
    onToggle,
    range: monthRange,
  }

  afterEach(() => {
    wrapper.unmount();
  })

  it('should be rendered properly', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper.find('.calendar')).toHaveLength(1);
    expect(wrapper.find(MonthCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarDay)).toHaveLength(props.range.length);

    wrapper.setProps({ type: 'week', range: weekRange });
    expect(wrapper.find(WeekCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarTime)).toHaveLength(24 * 7);
  });

  it('should be matched with the snapshot', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

