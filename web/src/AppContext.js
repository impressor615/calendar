import React from 'react';
import moment from 'moment';

const initialDate = moment().startOf('month');
export const AppContext = React.createContext({
  type: 'month',
  currentDate: initialDate,
  events: [],
  setLoading: () => {},
  onToggle: () => {},
  notify: () => {},
  updateEvents: () => {},
});

export const withContext = (Component) => props => (
  <AppContext.Consumer>
    {state => (
      <Component {...state} {...props} />
    )}
  </AppContext.Consumer>
);