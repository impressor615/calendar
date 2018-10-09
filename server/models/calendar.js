const mongoose = require('mongoose');

delete mongoose.connection.models.Calendar;
const { Schema } = mongoose;
const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('Calendar', schema);
