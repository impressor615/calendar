const express = require('express');
const calendar = require('./routes/calendar');

const app = express();
const PORT = process.env.PORT || 4000;


app.use('/api/calendar', calendar);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`server listening on port ${PORT}`);
  });
}

module.exports = app;
