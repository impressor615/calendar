const express = require('express');
const errors = require('../errors');
const { Calendar } = require('../models');
const { sendError } = require('../utils/routeUtils');

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, start_date, end_date } = req.body;
  if (!title || !start_date || !end_date) {
    sendError(res);
    return;
  }

  const condition = {
    start_date: {
      $gte: start_date,
      $lt: end_date,
    },
  };
  const calendar = await Calendar.findOne(condition).lean().exec();
  if (calendar) {
    sendError(res, errors.calendar_duplicate_data);
    return;
  }

  const postData = {
    title,
    start_date,
    end_date,
  };

  await Calendar.create(postData);
  return res.json({});
});

router.get('/', async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    sendError(res);
    return;
  }

  const condition = {
    start_date: {
      $gte: start_date,
    },
    end_date: {
      $lt: end_date,
    },
  };

  const result = await Calendar.find(condition, '_id title start_date end_date').lean().exec();
  res.json(result);
});

module.exports = router;
