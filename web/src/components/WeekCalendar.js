import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import EventBlock from 'components/EventBlock';
import { eventBind } from 'utils/eventUtils';
import CONSTANTS from '../constants';


const { DAY, HOURS } = CONSTANTS;
export const CalendarTime = ({
  children,
  onToggle,
  onDrop,
}) => (
  <div
    className="cal-block sm"
    onClick={onToggle}
    onDragOver={eventBind((e) => e.preventDefault())}
    onDrop={onDrop}
  >
    {children}
  </div>
);

CalendarTime.defaultProps = {
  children: '',
};

CalendarTime.propTypes = {
  children: PropTypes.node,
  onToggle: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

const WeekCalendar = ({
  range,
  onToggle,
  onDragStart,
  onDrop,
  currentDate,
  data,
}) => (
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
              const { text , code } = hourObj;
              const intCode = parseInt(code, 10);
              const blockDate = moment(dateObj.moment).hours(intCode).format('YYYY-MM-DD hh:mm A');
              const event = data.find((item) => {
                const eventDate = moment(item.start_date).format('YYYY-MM-DD hh:mm A');
                return eventDate === blockDate;
              });
              return (
                <CalendarTime
                  key={index.toString()}
                  onToggle={eventBind(onToggle, { type: 'week', hour: code, dateObj })}
                  onDrop={eventBind(onDrop, { type: 'week', hour: code, dateObj })}
                >
                  {
                    event
                      ? (
                        <EventBlock
                          fluid
                          className="secondary"
                          key={index.toString()}
                          onToggle={eventBind(onToggle, { type: 'event', dateObj: event })}
                          onDragStart={eventBind(onDragStart, { event })}
                        >
                          <div>{event.title}</div>
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

WeekCalendar.propTypes = {
  range: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeekCalendar;