const list_keywords = ({ Keyword }, { config }) => async (req, res, next) => {
  try {
    const data = await Keyword.find({});
    res.status(200).send({ data });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = { list_keywords };