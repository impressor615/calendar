import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CONSTANTS from '../constants';


const { DAY, HOURS } = CONSTANTS;
const CalendarDay = ({
  day,
  date,
  children,
}) => (
  <button className="cal-block">
    { day ? <div className="day">{day}</div> : null}
    <div>{date}</div>
    {children}
  </button>
);

const MonthCalendar = ({ range }) => (
  <section className="month-calendar">
    {
      range.map((date, index) => (
        <Fragment key={index.toString()}>
          {
            index <= 6
              ? <CalendarDay date={date} day={DAY[index]} />
              : <CalendarDay date={date} />
          }
        </Fragment>
      ))
    }
  </section>
);

const CalendarTime = ({ children }) => (
  <button className="cal-block sm">
    {children}
  </button>
);

const WeekCalendar = ({ range }) => (
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
              <CalendarTime key={index.toString()} />
            ))
          }
        </Fragment>
      ))
    }
  </section>
);

const Calendar = ({ type, range }) => (
  <article className="calendar">
    {
      type === 'month'
        ? <MonthCalendar range={range} />
        : <WeekCalendar range={range} />
    }
  </article>
);

Calendar.propTypes = {
  type: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Calendar;
