const { Router: router } = require('express');

const { list_contributions } = require('./list_contributions');
const { add_contributions } = require('./add_contributions');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_contributions(models, { config }));
  api.post('/', add_contributions(models, { config }));

  return api;
};
