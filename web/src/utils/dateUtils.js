import moment from 'moment';

export const monthRanges = (date) => {
  const startDate = moment(date).startOf('month').startOf('week');
  const endDate = moment(date).endOf('month').endOf('week');
  const diff = endDate.diff(startDate, 'days') + 1;
  return Array.from({ length: diff }).map((_, index) => (
    moment(startDate).add(index, 'days').date()
  ));
};

export const weekRanges = (date) => {
  const startDate = moment(date).startOf('week');
  const endDate = moment(date).endOf('week');
  const diff = endDate.diff(startDate, 'days') + 1;
  return Array.from({ length: diff }).map((_, index) => (
    moment(startDate).add(index, 'days').date()
  ));
}
