import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import CalController from 'components/CalController';
import Calendar from 'components/Calendar';
import CalModal from 'components/CalModal';
import { monthRanges, weekRanges } from 'utils/dateUtils';

import CONSTANTS from './constants';


const { MOMENTS } = CONSTANTS;
class App extends Component {
  constructor(props) {
    super(props);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.onTypeClick = this.onTypeClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    const defaultDate = moment().startOf('month');
    this.state = {
      date: defaultDate,
      type: 'month',
      range: monthRanges(defaultDate),
      isOpen: false,
      calendar: {},
      event: {
        title: '',
        start_date: defaultDate,
        end_date: moment(defaultDate).add(1, 'hours'),
      },
    };
  }

  componentDidMount() {
    const { date } = this.state;
    const start_date  = date.toISOString();
    const end_date = moment(date).add(1, 'months').toISOString();
    axios.get('/api/calendar', { params: { start_date, end_date } })
    .then((res) => {
      const { data } = res;
      const calendar = data.reduce((current, next) => {
        const { start_date, end_date, title } = next;
        const momentObj = moment(start_date);
        const dateKey = momentObj.format('YYYY-MM-DD');
        const hourKey = momentObj.hour();
        current[dateKey] = {
          ...current[dateKey],
          [hourKey]: {
            title,
            start_date,
            end_date,
          }
        };
        return current;
      }, {});
      this.setState({ calendar });
    });
  }

  onArrowClick(e) {
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type, date } = this.state;
    const newDate = (
      (name === 'next')
        ? moment(date).add(1, MOMENTS[type])
        : moment(date).subtract(1, MOMENTS[type])
    );
    const range = (
      type === 'month'
        ? monthRanges(newDate)
        : weekRanges(newDate)
    );

    this.setState({
      date: newDate,
      range,
    });
  }

  onTypeClick(e) {
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type, date } = this.state;
    if (name === type) {
      return;
    }

    const newDate = (
      (name === 'month')
        ? moment(date).startOf('month')
        : moment(date).startOf('week')
    );
    const range = (
      (name === 'month')
        ? monthRanges(newDate)
        : weekRanges(newDate)
    );

    this.setState({
      type: name,
      date: newDate,
      range,
    });
  }

  onToggle(e, props = {}) {
    e.stopPropagation();
    const { type, dateObj, hour } = props;
    const { isOpen, event } = this.state;

    if (isOpen) {
      this.setState({
        isOpen: !isOpen,
      });
      return;
    }

    const newEvent = {}
    if (type === 'month') {
      const startDate = moment(dateObj.moment).hours(9);
      newEvent.start_date = startDate;
      newEvent.end_date = moment(startDate).add(1, 'hours');
    }

    if (type === 'week') {
      const startDate = moment(`${dateObj.year}-${dateObj.month}-${dateObj.date} ${hour}:00`, 'YYYY-M-D hh:mm');
      newEvent.start_date = startDate;
      newEvent.endDate = moment(startDate).add(1, 'hours');
    }

    if (type === 'event') {
      const { start_date, end_date, title } = dateObj;
      newEvent.title = title;
      newEvent.start_date = moment(start_date);
      newEvent.end_date = moment(end_date);
    }

    this.setState({
      isOpen: !isOpen,
      event: {
        ...event,
        ...newEvent,
      },
    });
  }

  onTitleChange(e) {
    e.preventDefault();
    const { value } = e.currentTarget;
    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        title: value,
      },
    });
  }

  onDateChange(date) {
    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        start_date: date,
        end_date: moment(date).add(1, 'hours'),
      },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { event, calendar } = this.state;
    const { title, start_date, end_date } = event;
    const postData = {
      title,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
    };
    axios.post('/api/calendar', postData)
    .then(() => {
      const newCalendar = { ...calendar };
      const dateKey = start_date.format('YYYY-MM-DD');
      const hourKey = start_date.hour();
      newCalendar[dateKey] = {
        ...newCalendar[dateKey],
        [hourKey]: {
          title,
          start_date,
          end_date,
        }
      };
      this.setState({ calendar: newCalendar, isOpen: false });
    }, (error) => {
      // TODO: notification comes here
      console.log(error);
    });
  }

  render() {
    const {
      type,
      date,
      range,
      isOpen,
      event,
      calendar,
    } = this.state;
    const title = date.format('YYYY년 MM월');
    return (
      <section className="container">
        <CalController
          type={type}
          title={title}
          onArrowClick={this.onArrowClick}
          onTypeClick={this.onTypeClick}
        />
        <Calendar
          type={type}
          range={range}
          currentDate={date}
          onToggle={this.onToggle}
          data={calendar}
        />
        <CalModal
          isOpen={isOpen}
          onToggle={this.onToggle}
          onChange={this.onTitleChange}
          onDateChange={this.onDateChange}
          onSubmit={this.onSubmit}
          event={event}
        />
      </section>
    );
  }
}

export default App;
