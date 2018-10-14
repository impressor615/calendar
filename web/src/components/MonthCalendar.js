import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import EventBlock from 'components/EventBlock';
import { getHourKey } from 'utils/dateUtils';
import { eventBind } from 'utils/eventUtils';
import CONSTANTS from '../constants';


const { DAY } = CONSTANTS;
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
};

CalendarDay.propTypes = {
  day: PropTypes.string,
  children: PropTypes.node,
  dateObj: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

const MonthCalendar = ({
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

export default MonthCalendar;