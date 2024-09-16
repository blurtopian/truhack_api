const { Router: router } = require('express');

const { grade_contrib } = require('./grade_contrib');

module.exports = (models, { config }) => {
  const api = router();

  api.post('/', grade_contrib(models, { config }));

  return api;
};
