const { sendOne } = require('../../middleware');
const _ = require('lodash');

const patch_country = ({ Country }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const item = await Country.findOne({ _id });
    _.extend(item, req.body);
    await item.save();

    return sendOne(res, { data: item });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { patch_country };