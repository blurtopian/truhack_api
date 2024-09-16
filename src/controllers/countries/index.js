const { Router: router } = require('express');

const { get_country } = require('./get_country');
const { add_country } = require('./add_country');
const { add_countries } = require('./add_countries');
const { list_countries } = require('./list_countries');
const { patch_country } = require('./patch_country');
const { delete_country } = require('./delete_country');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_countries(models, { config }));
  api.post('/', add_country(models, { config }));
  api.post('/upload', add_countries(models, { config }));

  api.get('/:_id', get_country(models, { config }));
  api.patch('/:_id', patch_country(models, { config }));
  api.delete('/:_id', delete_country(models, { config }));

  return api;
};
