const express = require('express');
const errors = require('../errors');
const { Calendar } = require('../models');
const { sendError } = require('../utils/routeUtils');

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, start_date, end_date } = req.body;
  const { language } = req;
  if (!title || !start_date || !end_date) {
    sendError({ res, language });
    return;
  }

  if (new Date(start_date) >= new Date(end_date)) {
    sendError({ res, language });
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
    const errObj = {
      res,
      language: req.langauge,
      error: errors.duplicate_event_exsists,
    };
    sendError(errObj);
    return;
  }

  const postData = {
    title,
    start_date,
    end_date,
  };

  const result = await Calendar.create(postData);
  return res.json({ _id: result._id });
});

router.get('/', async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    sendError({ res, langauge: req.language });
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
  const { language } = req;
  try {
    const targetCalendar = await Calendar.findById(id).exec();
    if (!targetCalendar) {
      sendError({ res, language });
      return;
    }
  } catch (error) {
    sendError({ res, language });
    return;
  }

  if (!start_date || !end_date || !title) {
    sendError({ res, language });
    return;
  }

  if (new Date(start_date) >= new Date(end_date)) {
    sendError({ res, language });
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
    const errObj = {
      res,
      language,
      error: errors.duplicate_event_exsists,
    };
    sendError(errObj);
    return;
  }

  const putData = {
    start_date,
    end_date,
    title,
  };

  await Calendar.findByIdAndUpdate({ _id: id }, putData, { useFindAndModify: false }).exec();
  return res.json({});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { language } = req;

  try {
    const targetCalendar = await Calendar.findById(id).exec();
    if (!targetCalendar) {
      sendError({ res, language });
      return;
    }
  } catch (err) {
    sendError({ res, language });
    return;
  }

  await Calendar.findByIdAndRemove(id, { useFindAndModify: false }).exec();
  return res.json({});
});

module.exports = router;
