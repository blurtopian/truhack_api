const get_tweet = ({ Tweet }, { config }) => async (req, res, next) => {
    const { _id } = req.params;
    try {
        const item = await Tweet.findOne({ _id });
        res.status(200).send({ data: item });
    } catch (error) {
        next(error);
    }
}

module.exports = { get_tweet };