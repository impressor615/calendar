const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CONFIG = require('config');

const parseLanguage = require('./middlewares/parseLanguage');
const calendar = require('./routes/calendar');
const models = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;
const { mongodb } = CONFIG;
const { Calendar } = models;

(async () => {
  // mongodb
  mongoose.Promise = Promise;
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`,
      { useNewUrlParser: true },
    );
  }
  // reset calendar collectoin
  await Calendar.deleteMany();

  // express
  app.use(bodyParser.json());
  app.use(parseLanguage);
  app.use('/api/calendar', calendar);
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`server listening on port ${PORT}`);
    });
  }
})();

module.exports = app;
