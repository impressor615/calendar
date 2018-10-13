import moment from 'moment';

export const monthRange = (date) => {
  const startDate = moment(date).startOf('month').startOf('week');
  const endDate = moment(date).endOf('month').endOf('week');
  const diff = endDate.diff(startDate, 'days') + 1;
  return {
    start_date: startDate,
    end_date: endDate,
    items: Array.from({ length: diff }).map((_, index) => {
      const targetDate = moment(startDate).add(index, 'days');
      return {
        year: targetDate.year(),
        month: (targetDate.month() + 1),
        date: targetDate.date(),
        moment: targetDate,
      };
    }),
  }
};

export const weekRange = (date) => {
  const startDate = moment(date).startOf('week');
  const endDate = moment(date).endOf('week');
  const diff = endDate.diff(startDate, 'days') + 1;
  return {
    start_date: startDate,
    end_date: endDate,
    items: Array.from({ length: diff }).map((_, index) => {
      const targetDate = moment(startDate).add(index, 'days');
      return {
        year: targetDate.year(),
        month: (targetDate.month() + 1),
        date: targetDate.date(),
        moment: targetDate,
      };
    }),
  };
};

export const getHourKey = (hour) => {
  let hourKey = hour.toString();
  if (hour <= 9) {
    hourKey = `0${hourKey}`;
  }
  return hourKey;
};
