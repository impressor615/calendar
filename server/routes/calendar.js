const express = require('express');
const _ = require('lodash');
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

  if (new Date(start_date) >= new Date(end_date)) {
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, title } = req.body;
  try {
    const targetCalendar = await Calendar.findById(id).exec();
    if (!targetCalendar) {
      sendError(res);
      return;
    }
  } catch (error) {
    sendError(res);
    return;
  }

  if (!start_date || !end_date || !title) {
    sendError(res);
    return;
  }

  if (new Date(start_date) >= new Date(end_date)) {
    sendError(res);
    return;
  }

  const condition = {
    _id: {
      $ne: id,
    },
    start_date: {
      $gte: start_date,
      $lt: end_date,
    },
  };

  const calendars = await Calendar.find(condition).lean().exec();
  if (calendars.length) {
    sendError(res, errors.calendar_duplicate_data);
    return;
  }

  const putData = _.pick({
    start_date,
    end_date,
    title,
  }, _.identity);

  await Calendar.findByIdAndUpdate({ _id: id }, putData, { useFindAndModify: false }).exec();
  return res.json({});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const targetCalendar = await Calendar.findById(id).exec();
    if (!targetCalendar) {
      sendError(res);
      return;
    }
  } catch (err) {
    sendError(res);
    return;
  }

  await Calendar.findByIdAndRemove(id, { useFindAndModify: false }).exec();
  return res.json({});
});

module.exports = router;
