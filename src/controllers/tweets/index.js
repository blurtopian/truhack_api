const { Router: router } = require('express');
const { get_tweet } = require('./get_tweet');
const { list_tweets } = require('./list_tweets');
const { patch_tweet } = require('./patch_tweet');

module.exports = (models, { config }) => {
  const api = router();

  api.get('/', list_tweets(models, { config }));

  api.get('/:_id', get_tweet(models, { config }));
  api.patch('/:_id', patch_tweet(models, { config }));

  return api;
};
