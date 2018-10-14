import React, { Component } from 'react';
import moment from 'moment';

import CalController from 'components/CalController';
import CalModal from 'components/CalModal';
import Loading from 'components/Loading';
import Notification from 'components/Notification';

import { AppContext } from './AppContext';
import Calendar from './Calendar';
import CONSTANTS from './constants';


const { MOMENTS } = CONSTANTS;
class App extends Component {
  constructor(props) {
    super(props);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onToggleMsg = this.onToggleMsg.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.notify = this.notify.bind(this);

    const initialDate = moment().startOf('month');
    this.state = {
      isOpen: false,
      isLoading: false,
      date: initialDate,
      type: 'month',
      events: [],
      event: {
        _id: '',
        title: '',
        start_date: initialDate,
        end_date: moment(initialDate).add(1, 'hours'),
      },
      message: {
        isOpen: false,
        message: '',
        type: 'danger',
      },
    };
  }

  componentWillUnmount() {
    if (this.closeMsg) {
      clearTimeout(this.closeMsg);
    }
  }

  onArrowClick(e) {
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type, date } = this.state;

    let newDate;
    if (name === 'next') {
      newDate = moment(date).add(1, MOMENTS[type]);
    }

    if (name === 'previous') {
      newDate = moment(date).subtract(1, MOMENTS[type]);
    }

    this.setState({ date: newDate });
  }

  onTypeChange(e) {
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type } = this.state;
    if (name === type) {
      return;
    }

    let newDate;
    if (name === 'month') {
      newDate = moment().startOf('month');
    }

    if (name === 'week') {
      newDate = moment().startOf('week');
    }

    this.setState({ type: name, date: newDate });
  }

  onToggle(newEvent) {
    const { isOpen, event } = this.state;
    if (isOpen) {
      this.setState({
        isOpen: !isOpen,
        event: {
          ...event,
          _id: '',
          title: '',
        },
      });
      return;
    }

    this.setState({
      isOpen: !isOpen,
      event: {
        ...event,
        ...newEvent,
      },
    });
  }

  updateEvents(newEvents) {
    this.setState({ events: newEvents });
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

  onToggleMsg() {
    const { message } = this.state;
    const { isOpen } = message;
    this.setState({
      message: {
        ...message,
        isOpen: !isOpen,
      },
    });
  }

  setLoading() {
    const { isLoading } = this.state;
    this.setState({
      isLoading: !isLoading,
    });
  }

  notify(data) {
    const { message } = this.state;
    this.setState({
      message: {
        ...message,
        isOpen: true,
        type: data.type,
        message: data.message,
      },
    });

    this.closeMsg = setTimeout(this.onToggleMsg, 1000);
  }

  render() {
    const {
      type,
      date,
      event,
      events,
      isOpen,
      message,
      isLoading,
    } = this.state;
    return (
      <AppContext.Provider value={{
        type,
        events,
        isOpen,
        isLoading,
        currentDate: date,
        setLoading: this.setLoading,
        onToggle: this.onToggle,
        notify: this.notify,
        updateEvents: this.updateEvents,
      }}>
        <section className="container">
          <CalController
            onArrowClick={this.onArrowClick}
            onTypeChange={this.onTypeChange}
          />
          <Calendar />
          <CalModal
            onChange={this.onTitleChange}
            onDateChange={this.onDateChange}
            event={event}
            onSubmit={this.onSubmit}
          />
          <Loading isOpen={isLoading} />
          <Notification onToggle={this.onToggleMsg} {...message} />
        </section>
      </AppContext.Provider>
    );
  }
}

export default App;
