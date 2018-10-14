import axios from 'axios';
import moment from 'moment';


export const authAxios = axios.create({ headers: { 'x-access-token': process.env.REACT_APP_SECRET } });
export const fetchEvents = (startDate, endDate) => {
  const start_date = startDate.toISOString();
  const end_date = endDate.toISOString();
  return authAxios.get('/api/calendar', { params: { start_date, end_date }})
    .then(res => res.data)
};

export const updateServerEvent = (_id, putData, events) => (
  authAxios.put(`/api/calendar/${_id}`, putData)
    .then(() => {
      const newEvents = [...events].filter(item => item._id !== _id);
      putData._id = _id
      newEvents.push(putData);
      return newEvents;
    })
);

export const deleteEvent = (_id, events) => (
  authAxios.delete(`/api/calendar/${_id}`)
  .then(() => {
    const newEvents = [...events].filter(item => item._id !== _id);
    return newEvents;
  })
);

export const postEvent = (postData, events) => (
  authAxios.post('/api/calendar', postData)
  .then((res) => {
    const { title, start_date, end_date } = postData;
    const newEvents = [...events];
    newEvents.push({
      _id: res.data._id,
      title,
      start_date: moment(start_date),
      end_date: moment(end_date),
    });
    return newEvents;
  })
);

