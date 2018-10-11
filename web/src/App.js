import React, { Component } from 'react';
import moment from 'moment';

import CalController from 'components/CalController';

import CONSTANTS from './constants';


const { MOMENTS } = CONSTANTS;
class App extends Component {
  constructor(props) {
    super(props);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.onTypeClick = this.onTypeClick.bind(this);
    this.state = {
      date: moment().startOf('month'),
      type: 'month',
    };
  }

  onArrowClick(e) {
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type, date } = this.state;
    const newDate = (
      (name === 'next')
        ? date.add(1, MOMENTS[type])
        : date.subtract(1, MOMENTS[type])
    );

    this.setState({
      date: newDate,
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
        ? date.startOf('month')
        : date.startOf('week')
    );
    this.setState({
      type: name,
      date: newDate,
    });
  }

  render() {
    const { type, date } = this.state;
    const title = date.format('YYYY년 MM월');
    return (
      <section className="container">
        <CalController
          type={type}
          title={title}
          onArrowClick={this.onArrowClick}
          onTypeClick={this.onTypeClick}
        />
      </section>
    );
  }
}

export default App;
