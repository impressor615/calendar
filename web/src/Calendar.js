import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { MonthCalendar, WeekCalendar } from 'components/Calendar';
import { monthRange, weekRange } from 'utils/dateUtils';
import { fetchEvents, updateServerEvent } from 'utils/fetchUtils';
import { getErrorMsg } from 'utils/errorUtils';

import { withContext } from './AppContext';
import CONSTANTS from './constants';


const { NOTIFICATION } = CONSTANTS;
class Calendar extends Component {
  constructor(props) {
    super(props);
    const {
      currentDate,
    } = this.props;

    this.onToggle = this.onToggle.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      ...monthRange(currentDate),
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    const prevCurrentDate = prevProps.currentDate;
    const prevType = prevProps.type;
    const { currentDate, type } = this.props;
    if (!prevCurrentDate.isSame(currentDate) || prevType !== type) {
      const rangeData = type === 'month' ? monthRange(currentDate) : weekRange(currentDate);
      this.setState({
        ...rangeData,
      }, () => this.getEvents());
    }
  }

  onToggle(e, props) {
    e.stopPropagation();
    const { onToggle } = this.props;
    const newEvent = this.getModalData(props);
    onToggle(newEvent);
  }

  onDragStart(e, props) {
    const { event } = props;
    e.dataTransfer.setData('event_data', JSON.stringify(event));
  }

  onDrop(e, props) {
    const { events, updateEvents, notify, setLoading } = this.props;
    const { type, hour, dateObj } = props;
    const { year, month, date } = dateObj;
    const event = JSON.parse(e.dataTransfer.getData('event_data'));
    const { title, _id, start_date } = event;

    let newStartDate;
    let newEndDate;
    if (type === 'week') {
      newStartDate = moment(`${year}-${month}-${date} ${hour}:00`, 'YYYY-M-D hh:mm');
      newEndDate = moment(newStartDate).add(1, 'hours');
    }

    if (type === 'month') {
      newStartDate = (
        moment(start_date)
          .year(year)
          .month(month - 1)
          .date(date)
      );
      newEndDate = moment(newStartDate).add(1, 'hours');
    }

    const putData = {
      title,
      start_date: newStartDate.toISOString(),
      end_date: newEndDate.toISOString(),
    };
    setLoading();
    updateServerEvent(_id, putData, events)
      .then((newEvents) => {
        setLoading();
        updateEvents(newEvents);
        notify({
          type: 'success',
          message: NOTIFICATION.update,
        });
      }, (error) => {
        setLoading();
        const message = getErrorMsg(error);
        notify({ message });
      });
  }

  getModalData({ type, dateObj, hour }) {
    const newEvent = {};
    if (type === 'month') {
      const currentHour = moment().hour();
      const startDate = moment(dateObj.moment).hours(currentHour);
      newEvent.start_date = startDate;
      newEvent.end_date = moment(startDate).add(1, 'hours');
    }

    if (type === 'week') {
      const startDate = moment(`${dateObj.year}-${dateObj.month}-${dateObj.date} ${hour}:00`, 'YYYY-M-D hh:mm');
      newEvent.start_date = startDate;
      newEvent.end_date = moment(startDate).add(1, 'hours');
    }

    if (type === 'event') {
      const { start_date, end_date, title, _id } = dateObj;
      newEvent._id = _id;
      newEvent.title = title;
      newEvent.start_date = moment(start_date);
      newEvent.end_date = moment(end_date);
    }

    return newEvent;
  }

  getEvents() {
    const { setLoading, notify, updateEvents } = this.props;
    const { start_date, end_date } = this.state;
    setLoading();
    fetchEvents(start_date, end_date)
    .then((result) => {
      setLoading();
      updateEvents(result);
      this.setState({
        calendar: result,
      });
    }, (error) => {
      setLoading();
      const message = getErrorMsg(error);
      notify({ message });
    });
  }

  render() {
    const {
      type,
      events,
      currentDate,
    } = this.props;
    const {
      range,
    } = this.state;
    return (
      <div className="calendar">
        {
          type === 'month' ? (
            <MonthCalendar
              range={range}
              currentDate={currentDate}
              data={events}
              onToggle={this.onToggle}
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
            /> 
          ) : (
            <WeekCalendar
              range={range}
              currentDate={currentDate}
              data={events}
              onToggle={this.onToggle}
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
            />
          )
        }
      </div>
    );
  }
};

Calendar.propTypes = {
  type: PropTypes.string.isRequired,
  currentDate : PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  updateEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default withContext(Calendar);
