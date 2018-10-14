import React from 'react';
import moment from 'moment';

import WeekCalendar, { CalendarTime } from 'components/WeekCalendar';
import EventBlock from 'components/EventBlock';
import { weekRange } from 'utils/dateUtils';


describe("<WeekCalendar />", () => {
  const onToggle = jest.fn();
  const onDrop = jest.fn();
  const onDragStart = jest.fn();
  const currentDate = moment('2018-10-14');
  const { range } = weekRange(currentDate);
  const props = {
    range,
    currentDate,
    onToggle,
    onDrop,
    onDragStart,
    data: [
      {
        title: 'title',
        start_date: moment(currentDate).toISOString(),
        end_date: moment(currentDate).add(1, 'hours').toISOString(),
      },
    ]
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    expect(wrapper.find('.week-calendar')).toHaveLength(1);
    expect(wrapper.find(CalendarTime)).toHaveLength(24 * 7);
    expect(wrapper.find(EventBlock)).toHaveLength(1);
  });

  it('methods should be called properly', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    wrapper.find(CalendarTime).first().simulate('drop');
    wrapper.find(EventBlock).simulate('dragstart');
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(onDragStart).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
