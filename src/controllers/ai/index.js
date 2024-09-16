const { Router: router } = require('express');

const { sentiment_ai } = require('./sentiment_ai');

module.exports = (models, { config }) => {
  const api = router();

  api.post('/sentiment', sentiment_ai(models, { config }));

  return api;
};
