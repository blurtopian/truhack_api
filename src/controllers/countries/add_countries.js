const _ = require('lodash');

const add_countries = ({ Country }, { config }) => async (req, res, next) => {
  const { data } = req.body;

  try {
    const items = await data.map(async ([countryName]) => {
      const newItem = new Country();
      _.extend(newItem, {
        name: countryName,
      })
      return newItem;
    });

    Promise.all(items)
      .then(async response => {
        const result = await Country.insertMany(response, { ordered: false });
        return res.status(200).send({ succes: true, message: 'Countries added!', result });
      }).catch(error => {
        if (error.code === 11000) {
          return res.status(200).send({ succes: true, message: `${error.result.nInserted} countries added!` });
        }
        return res.status(422).send({ succes: false, message: 'Error in adding countries!' });
      });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
};

module.exports= { add_countries };