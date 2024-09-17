const { Router: router } = require('express');
const { list_tweets } = require('./list_tweets');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_tweets(models, { config }));

  return api;
};
