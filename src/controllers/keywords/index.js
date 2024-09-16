const { Router: router } = require('express');

const { list_keywords } = require('./list_keywords');
const { add_keyword } = require('./add_keyword');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_keywords(models, { config }));
  api.post('/', add_keyword(models, { config }));

  return api;
};
