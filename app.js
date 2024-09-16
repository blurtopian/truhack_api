require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const parseDomain = require("parse-domain");

const mongoose = require('mongoose');
const _ = require('lodash');

const api = require('./src/api');
const app = express();

var mongoDb = mongoose.createConnection(
  (process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
);

const { SentimentSchema, SentimentsAggregateSchema, KeywordSchema, TweetSchema } = require('./src/schemas');
const Keyword = mongoDb.model('Keyword', KeywordSchema);
const SentimentsAggregate = mongoDb.model('SentimentsAggregate', SentimentsAggregateSchema);
// Middleware to update aggregate collection
SentimentSchema.post(['save', 'updateOne', 'deleteOne'], async function (doc) {
  const sentiment_type = doc.type;
  console.log('Updating aggregate collection for sentiment type:', sentiment_type);
  
  // Calculate new aggregate values
  const aggregate = await this.model.aggregate([
    { $match: { sentiment_type: sentiment_type } },
    {
      $group: {
        _id: '$type',
        total_positive: { $sum: '$positive' },
        total_negative: { $sum: '$negative' },
        total_sentiment: { $sum: '$sentiment' },
      },
    },
  ]);
  console.log('Aggregate:', aggregate);

  if (aggregate.length > 0) {
    const { total_positive, total_negative, total_sentiments } = aggregate[0];
    
    // Update the aggregate collection
    await SentimentsAggregate.updateOne(
      { type: sentiment_type },
      {
        total_positive,
        total_negative,
        total_sentiments,
      },
      { upsert: true }
    );
  }
});
const Sentiment = mongoDb.model('Sentiment', SentimentSchema);
const Tweet = mongoDb.model('Tweet', TweetSchema);
const models = { Sentiment, SentimentsAggregate, Keyword, Tweet };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const whitelist = [
  process.env.CLIENT_ORIGIN,
];
var corsOptions = {
  origin: function (origin, callback) {
    const originInfo = parseDomain(origin, { customTlds: /localhost|\.local/ });
    if (whitelist.indexOf(origin) !== -1
      || (originInfo &&
        ((originInfo.domain === "blurtopian" && originInfo.tld === "com")
          || originInfo.tld === "localhost"
        )
      )
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api({}, models));
app.use('/api', api({}, models));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;