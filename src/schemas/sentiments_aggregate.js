const mongoose = require('mongoose');
const { Schema } = mongoose;

const SentimentAggregateSchema = new Schema({
  sentiment_type: {
    type: String,
    trim: true,
    required: true,
  },
 total_sentiments: {
    type: Number,
    required: true,
  },
  positive_sentiments: {
    type: Number,
    required: true,
  },
  negative_sentiments: {
    type: Number,
    required: true,
  },
}, {
  collection: 'sentiments_aggregate'
});

module.exports = { SentimentAggregateSchema };