import React from 'react';
import moment from 'moment';

import Calendar, {
  MonthCalendar,
  WeekCalendar,
  CalendarDay,
  CalendarTime,
  EventBlock,
} from 'components/Calendar';
import { weekRanges, monthRanges } from 'utils/dateUtils';


describe('<Calendar />', () => {
  const onToggle = jest.fn();
  const currentDate = moment('2018-10-13');
  const monthRange = monthRanges(currentDate);
  const weekRange = weekRanges(currentDate);
  let wrapper;
  const props = {
    type: 'month',
    currentDate,
    range: monthRange,
    onToggle,
    data: {
      '2018-10-13': {
        '9': {
          title: 'title',
          start_date: moment(currentDate).toISOString(),
          end_date: moment(currentDate).add(1, 'hours').toISOString(),
        },
      },
    },
  }

  afterEach(() => {
    wrapper.unmount();
  })

  it('should be rendered properly', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper.find('.calendar')).toHaveLength(1);
    expect(wrapper.find(MonthCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarDay)).toHaveLength(props.range.length);
    expect(wrapper.find(EventBlock)).toHaveLength(1);

    wrapper.setProps({ type: 'week', range: weekRange });
    expect(wrapper.find(WeekCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarTime)).toHaveLength(24 * 7);
  });

  it('should be matched with the snapshot', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

