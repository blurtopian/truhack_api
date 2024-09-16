const _ = require('lodash');

const add_contributions = ({ Contribution }, { config }) => async (req, res, next) => {
  console.log('add_contributions req.body', req.body)
  const { data } = req.body;
  console.log('data', data)
  const { contributions } = data;

  try {
    const items = await contributions.map(async (item) => {
      const newItem = new Contribution();
      _.extend(newItem, {
        source: item.source,
        id: item.id,
        type: item.type,
        grade: item.grade,
        hash: item.sha,
        author: item.author,
        committer: item.committer,
        repo: item.repo,
      })
      return newItem;
    });

    const result = await Contribution.insertMany(items, { ordered: false });
    return res.status(200).send({ success: true, message: 'Countries added!', result });
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

module.exports= { add_contributions };