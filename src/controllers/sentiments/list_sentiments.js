const list_sentiments = ({ Sentiment }, { config }) => async (req, res, next) => {
  try {
    const data = await Sentiment.find({});
    res.status(200).send({ data });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = { list_sentiments };