const express = require('express');

const { errorHandler } = require('../middleware');

// list of controllers here
const ai = require('../controllers/ai')
const sentiments = require('../controllers/sentiments')
const keywords = require('../controllers/keywords')
const tweets = require('../controllers/tweets')

const routersInit = (config, models) => {
    const router = express();

    // register api points
    router.use('/ai', ai(models, { config }));
    router.use('/sentiments', sentiments(models, { config }));
    router.use('/keywords', keywords(models, { config }));
    router.use('/tweets', tweets(models, { config }));

    // catch all api errors
    router.use(errorHandler);

    return router;
};

module.exports = routersInit;