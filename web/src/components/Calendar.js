import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CONSTANTS from '../constants';


const { DAY, HOURS } = CONSTANTS;
export const CalendarDay = ({
  day,
  date,
  children,
  onToggle,
}) => (
  <button className="cal-block" onClick={onToggle}>
    { day ? <div className="day">{day}</div> : null}
    <div>{date}</div>
    {children}
  </button>
);

export const MonthCalendar = ({ range, onToggle }) => (
  <section className="month-calendar">
    {
      range.map((date, index) => (
        <Fragment key={index.toString()}>
          {
            index <= 6
              ? <CalendarDay date={date} day={DAY[index]} onToggle={onToggle} />
              : <CalendarDay date={date} onToggle={onToggle} />
          }
        </Fragment>
      ))
    }
  </section>
);

export const CalendarTime = ({ children, onToggle }) => (
  <button className="cal-block sm" onClick={onToggle}>
    {children}
  </button>
);

export const WeekCalendar = ({ range, onToggle }) => (
  <section className="week-calendar">
    <div className="cal-block sm" />
    {
      range.map((date, index) => (
        <div className="cal-block sm" key={index.toString()}>
          <div className="day">{DAY[index]}</div>
          <div>{date}</div>
        </div>
      ))
    }
    {
      HOURS.map((hour, index) => (
        <Fragment key={index.toString()}>
          <div className="cal-block sm">
            <span className="hour">{hour}</span>
          </div>
          {
            range.map((date, index) => (
              <CalendarTime key={index.toString()} onToggle={onToggle} />
            ))
          }
        </Fragment>
      ))
    }
  </section>
);

const Calendar = ({ type, range, onToggle }) => (
  <article className="calendar">
    {
      type === 'month'
        ? <MonthCalendar range={range} onToggle={onToggle} />
        : <WeekCalendar range={range} onToggle={onToggle} />
    }
  </article>
);

Calendar.propTypes = {
  type: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Calendar;
