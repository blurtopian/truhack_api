const express = require('express');

const { errorHandler } = require('../middleware');

// list of controllers here
const contrib_ai = require('../controllers/contrib_ai')
const contributions = require('../controllers/contributions')
const dummy = require('../controllers/dummy')

const routersInit = (config, models) => {
    const router = express();

    // register api points
    router.use('/contrib_ai', contrib_ai(models, { config }));
    router.use('/contributions', contributions(models, { config }));
    router.use('/dummy', dummy(models, { config }));

    // catch all api errors
    router.use(errorHandler);

    return router;
};

module.exports = routersInit;