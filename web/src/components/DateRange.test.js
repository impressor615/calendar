import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import DateRange from 'components/DateRange';


describe('<DateRange />', () => {
  const onChange = jest.fn()
  const startDate = moment('2018-10-13');
  const endDate = moment('2018-10-13').add(1, 'hours');
  const props = {
    onChange,
    startDate,
    endDate,
  };

  it('should be rendered properly', () => {
    const wrapper = shallow(<DateRange {...props} />);
    expect(wrapper.find('.date-range')).toHaveLength(1);
    expect(wrapper.find(DatePicker)).toHaveLength(1);
  });

  it('should be matched with the snapshot', () => {
    const wrapper = shallow(<DateRange {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});


