const _ = require('lodash');

const add_sentiments = ({ Sentiment }, { config }) => async (req, res, next) => {
  console.log('add_sentiments req.body', req.body)
  const { data } = req.body;
  console.log('data', data)
  const { sentiments } = data;

  try {
    const items = await sentiments.map(async (item) => {
      const newItem = new Sentiment();
      _.extend(newItem, ...item)
      return newItem;
    });

    const result = await Sentiment.insertMany(items, { ordered: false });
    return res.status(200).send({ success: true, message: 'Items added!', result });
    // Promise.all(items)
    //   .then(async response => {
    //     const result = await Contribution.insertMany(response, { ordered: false });
    //     return res.status(200).send({ success: true, message: 'Countries added!', result });
    //   }).catch(error => {
    //     if (error.code === 11000) {
    //       return res.status(200).send({ success: true, message: `${error.result.nInserted} added!` });
    //     }
    //     return res.status(422).send({ success: false, message: 'Error in adding countries!' });
    //   });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { add_sentiments };