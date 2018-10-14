import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

import Button from 'components/Button';
import { getHourKey } from 'utils/dateUtils';
import { eventBind } from 'utils/eventUtils';
import CONSTANTS from '../constants';


const { DAY, HOURS } = CONSTANTS;
export const EventBlock = ({
  children,
  onToggle,
  onDragStart,
  fluid,
  ...rest
}) => (
  <Button
    {...rest}
    draggable
    onClick={onToggle}
    onDragStart={onDragStart}
    className={classnames(
      'event-block',
      rest.className,
      { fluid },
    )}
  >
    { children }
  </Button>
);

EventBlock.defaultProps = {
  fluid: false,
};

EventBlock.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  fluid: PropTypes.bool,
}

export const CalendarDay = ({
  day,
  dateObj,
  children,
  currentDate,
  onToggle,
  onDrop,
}) => {
  const isYearShowing = currentDate.year() !== dateObj.year;
  const isMonthShowing = (currentDate.month() + 1) !== dateObj.month;
  return (
    <div
      className="cal-block"
      onClick={eventBind(onToggle, { type: 'month', dateObj })}
      onDrop={eventBind(onDrop, { type: 'month', dateObj })}
      onDragOver={eventBind((e) => e.preventDefault())}
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

CalendarDay.defaultProps = {
  day: '',
  children: '',
}

CalendarDay.propTypes = {
  day: PropTypes.string,
  children: PropTypes.node,
  dateObj: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export const MonthCalendar = ({
  range,
  onToggle,
  onDragStart,
  onDrop,
  currentDate,
  data,
}) => (
  <section className="month-calendar">
    {
      range.map((dateObj, index) => {
        const blockDate = dateObj.moment.format('YYYY-MM-DD');
        const events = data.filter((item) => {
          const eventDate = moment(item.start_date).format('YYYY-MM-DD');
          return eventDate === blockDate;
        }).sort((current, next) => new Date(current.start_date) - new Date(next.start_date));
        return (
          <CalendarDay
            key={index.toString()}
            currentDate={currentDate}
            dateObj={dateObj}
            day={DAY[index]}
            onToggle={onToggle}
            onDrop={onDrop}
          >
           {
              events.length
                ? (
                  <Fragment>
                    {
                      events.map((event, index) => (
                        <EventBlock
                          key={index.toString()}
                          className="primary"
                          onDragStart={eventBind(onDragStart, { event })}
                          onToggle={eventBind(onToggle, { type: 'event', dateObj: event })}
                        >
                          &#9675; {`${getHourKey(moment(event.start_date).hours())}:00 ${event.title}`}
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

MonthCalendar.propTypes = {
  range: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const CalendarTime = ({
  children,
  onToggle,
  onDragOver,
  onDrop,
}) => (
  <div
    className="cal-block sm"
    onClick={onToggle}
    onDragOver={onDragOver}
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
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export const WeekCalendar = ({
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
                  onDragOver={eventBind((e) => e.preventDefault())}
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
