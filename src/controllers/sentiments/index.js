const { Router: router } = require('express');

const { list_sentiments } = require('./list_sentiments');
const { add_sentiments } = require('./add_sentiments');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_sentiments(models, { config }));
  api.post('/', add_sentiments(models, { config }));

  return api;
};
