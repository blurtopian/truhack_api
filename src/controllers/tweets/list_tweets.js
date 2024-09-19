const list_tweets = ({ Tweet }, { config }) => async (req, res, next) => {
  const { reviewed } = req.query;
  console.log('typeof reviewed', typeof reviewed);
  console.log('req.query', req.query);

  const is_reviewed = reviewed == 'true' ? true : false;
  console.log('is_reviewed', is_reviewed);

  const query = {};
  if (reviewed) {
    query.is_reviewed = is_reviewed;
  }
  console.log('query', query);

  try {
    const data = await Tweet.find(query).limit(1);
    res.status(200).send({ data });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = { list_tweets };