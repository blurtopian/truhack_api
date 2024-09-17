const list_tweets = ({ Tweet }, { config }) => async (req, res, next) => {
  try {
    const data = await Tweet.find({});
    res.status(200).send({ data });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = { list_tweets };