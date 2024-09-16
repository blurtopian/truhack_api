const { Router: router } = require('express');

const { list_sentiments } = require('./list_sentiments');
const { add_sentiment } = require('./add_sentiment');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_sentiments(models, { config }));
  api.post('/', add_sentiment(models, { config }));

  return api;
};
