import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const DateRange = ({ startDate, endDate, onChange }) => (
  <div className="date-range">
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={onChange}
      timeIntervals={60}
      timeCaption="time"
      dateFormat="YYYY-M-D h:mm A"
    />
    <div>~</div>
    <div>{ endDate.format('YYYY-M-D h:mm A') }</div>
  </div>
);

DateRange.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DateRange;
