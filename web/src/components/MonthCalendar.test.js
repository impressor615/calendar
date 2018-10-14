import React from 'react';
import moment from 'moment';

import MonthCalendar, { CalendarDay } from 'components/MonthCalendar';
import EventBlock from 'components/EventBlock';
import { monthRange } from 'utils/dateUtils';


describe("<MonthCalendar />", () => {
  const onToggle = jest.fn();
  const onDrop = jest.fn();
  const onDragStart = jest.fn();
  const currentDate = moment('2018-10-14');
  const { range } = monthRange(currentDate);
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
    const wrapper = shallow(<MonthCalendar {...props} />);
    expect(wrapper.find('.month-calendar')).toHaveLength(1);
    expect(wrapper.find(CalendarDay)).toHaveLength(range.length);
    expect(wrapper.find(EventBlock)).toHaveLength(1);
  });

  it('methods should be called properly', () => {
    const wrapper = shallow(<MonthCalendar {...props} />);
    wrapper.find(CalendarDay).first().simulate('drop');
    wrapper.find(EventBlock).simulate('dragstart');
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(onDragStart).toHaveBeenCalledTimes(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<MonthCalendar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
