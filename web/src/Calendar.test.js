import React from 'react';
import moment from 'moment';

import Calendar from './Calendar';
import {
  MonthCalendar,
  WeekCalendar,
  CalendarDay,
  CalendarTime,
  EventBlock,
} from 'components/Calendar';
import { monthRange } from 'utils/dateUtils';


describe('<Calendar />', () => {
  const onToggle = jest.fn();
  const onDragStart = jest.fn();
  const onDrop = jest.fn();
  const currentDate = moment('2018-10-13');
  const mRange = monthRange(currentDate);
  let wrapper;
  const props = {
    type: 'month',
    currentDate,
    onToggle,
    onDragStart,
    onDrop,
    events: [
      {
        title: 'title',
        start_date: moment(currentDate).toISOString(),
        end_date: moment(currentDate).add(1, 'hours').toISOString(),
      },
    ],
  }

  afterEach(() => {
    wrapper.unmount();
  })

  it('should be rendered properly', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper.find('.calendar')).toHaveLength(1);
    expect(wrapper.find(MonthCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarDay)).toHaveLength(mRange.range.length);
    expect(wrapper.find(EventBlock)).toHaveLength(1);

    wrapper.setProps({ type: 'week' });
    wrapper.update();
    expect(wrapper.find(WeekCalendar)).toHaveLength(1);
    expect(wrapper.find(CalendarTime)).toHaveLength(24 * 7);
    expect(wrapper.find(EventBlock)).toHaveLength(1);
  });

  it('should be matched with the snapshot', () => {
    wrapper = mount(<Calendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

