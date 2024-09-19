const { sendOne } = require('../../middleware');
const _ = require('lodash');

const patch_tweet = ({ Tweet }, { config }) => async (req, res, next) => {
  console.log('patch_tweet' , req.body);
  const { _id } = req.params;
  try {
    const item = await Tweet.findOne({ _id });
    _.extend(item, req.body);
    await item.save();

    return sendOne(res, { data: item });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { patch_tweet };