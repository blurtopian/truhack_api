const list_contributions = ({ Contribution }, { config }) => async (req, res, next) => {
  try {
    const data = await Contribution.find({});
    res.status(200).send({ data });
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = { list_contributions };