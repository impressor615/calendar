import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { eventBind } from 'utils/eventUtils';
import CONSTANTS from '../constants';


export const EventBlock = ({
  children,
  onToggle,
  fluid,
  ...rest
}) => (
  <button
    {...rest}
    type="button"
    onClick={onToggle}
    className={classnames('event-block btn', rest.className, { fluid })}
  >
    {children}
  </button>
);

EventBlock.defaultProps = {
  fluid: false,
};

EventBlock.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  fluid: PropTypes.bool,
}

const { DAY, HOURS } = CONSTANTS;
export const CalendarDay = ({
  day,
  dateObj,
  children,
  currentDate,
  onToggle,
}) => {
  const isYearShowing = currentDate.year() !== dateObj.year;
  const isMonthShowing = (currentDate.month() + 1) !== dateObj.month;
  return (
    <div
      className="cal-block"
      onClick={eventBind(onToggle, { type: 'month', dateObj })}
    >
      { day ? <div className="day">{day}</div> : null}
      <div>
        { isYearShowing ? `${dateObj.year}년 ${dateObj.month}월 ${dateObj.date}일` : null }
        { !isYearShowing && isMonthShowing ? `${dateObj.month}월 ${dateObj.date}일` : null }
        { !isYearShowing && !isMonthShowing ? `${dateObj.date}` : null }
      </div>
      {children}
    </div>
  );
}

export const MonthCalendar = ({ range, onToggle, currentDate, data }) => (
  <section className="month-calendar">
    {
      range.map((dateObj, index) => {
        const dataKey = dateObj.moment.format('YYYY-MM-DD');
        const events = data[dataKey];
        return (
          <CalendarDay
            key={index.toString()}
            currentDate={currentDate}
            dateObj={dateObj}
            day={DAY[index]}
            onToggle={onToggle}
          >
           {
              events
                ? (
                  <Fragment>
                    {
                      Object.entries(events).map(([key, event], index) => (
                        <EventBlock
                          key={index.toString()}
                          className="primary"
                          onToggle={eventBind(onToggle, { type: 'event', dateObj: event })}
                        >
                          &#9675; {`${key}:00 ${event.title}`}
                        </EventBlock>
                      ))
                    }
                  </Fragment>
                ) : null
            }
          </CalendarDay>
        );
      })
    }
  </section>
);

export const CalendarTime = ({ children, onToggle }) => (
  <div className="cal-block sm" onClick={onToggle}>
    {children}
  </div>
);

export const WeekCalendar = ({ range, onToggle, currentDate, data }) => (
  <section className="week-calendar">
    <div className="cal-block sm" />
    {
      range.map((dateObj, index) => {
        const isYearShowing = currentDate.year() !== dateObj.year;
        const isMonthShowing = (currentDate.month() + 1) !== dateObj.month;
        return (
          <div className="cal-block sm" key={index.toString()}>
            <div className="day">{DAY[index]}</div>
            <div>
              { isYearShowing ? `${dateObj.year}년 ${dateObj.month}월 ${dateObj.date}일` : null }
              { !isYearShowing && isMonthShowing ? `${dateObj.month}월 ${dateObj.date}일` : null }
              { !isYearShowing && !isMonthShowing ? `${dateObj.date}` : null }
            </div>
          </div>
        );
      })
    }
    {
      HOURS.map((hourObj, index) => (
        <Fragment key={index.toString()}>
          <div className="cal-block sm">
            <span className="hour">{hourObj.text}</span>
          </div>
          {
            range.map((dateObj, index) => {
              const dataKey = dateObj.moment.format('YYYY-MM-DD');
              const events = data[dataKey];
              const { code, text } = hourObj;
              return (
                <CalendarTime
                  key={index.toString()}
                  onToggle={eventBind(onToggle, { type: 'week', hour: code, dateObj })}
                >
                  {
                    events && events[code]
                      ? (
                        <EventBlock
                          fluid
                          className="secondary"
                          key={index.toString()}
                          onToggle={eventBind(onToggle, { type: 'event', dateObj: events[code] })}
                        >
                          <div>{events[code].title}</div>
                          <div>{ text || '오전 00시' }</div>
                        </EventBlock>
                      ) : null
                  }
                </CalendarTime>
              );
            })
          }
        </Fragment>
      ))
    }
  </section>
);

const Calendar = ({
  type,
  range,
  currentDate,
  onToggle,
  data,
}) => (
  <article className="calendar">
    {
      type === 'month'
        ? <MonthCalendar range={range} onToggle={onToggle} currentDate={currentDate} data={data} />
        : <WeekCalendar range={range} onToggle={onToggle} currentDate={currentDate} data={data} />
    }
  </article>
);

Calendar.propTypes = {
  type: PropTypes.string.isRequired,
  currentDate: PropTypes.object.isRequired,
  range: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Calendar;
