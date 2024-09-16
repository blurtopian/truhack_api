const { sendOne } = require('../../middleware');
const _ = require('lodash');

const add_country = ({ Country }, { config }) => async (req, res, next) => {
  try {
    const newItem = new Country();
    let body = req.body
    Object.keys(body).forEach((key) => (_.isEmpty(body[key])) && delete body[key]);
    _.extend(newItem, body);
    await newItem.save();

    return sendOne(res, { data: newItem });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { add_country };