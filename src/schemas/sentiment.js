const mongoose = require('mongoose');
const { Schema } = mongoose;

const SentimentSchema = new Schema({
  sentiment: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    trim: true,
    required: true,
  },
  // grade: {
  //   author: String,
  //   date: Date,
  //   message: String,
  //   totalFiles: Number,
  //   totalLinesAdded: Number,
  //   totalLinesDeleted: Number,
  //   nature: String,
  //   scope: String,
  // },
});

module.exports = { SentimentSchema };