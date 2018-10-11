import React, { Component } from 'react';
import moment from 'moment';

import CalController from 'components/CalController';
import Calendar from 'components/Calendar';
import { monthRanges, weekRanges } from 'utils/dateUtils';

import CONSTANTS from './constants';


const { MOMENTS } = CONSTANTS;
class App extends Component {
  constructor(props) {
    super(props);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.onTypeClick = this.onTypeClick.bind(this);
    const defaultDate = moment().startOf('month');
    this.state = {
      date: defaultDate,
      type: 'month',
      range: monthRanges(defaultDate),
    };
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

  render() {
    const { type, date, range } = this.state;
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
        />
      </section>
    );
  }
}

export default App;
