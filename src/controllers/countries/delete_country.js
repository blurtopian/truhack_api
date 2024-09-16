const _ = require('lodash');

const delete_country = ({ Country }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const item = await Country.findOneAndDelete({ _id });
    res.status(200).send({ data: item });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { delete_country };
