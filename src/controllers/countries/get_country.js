const get_country = ({ Country }, { config }) => async (req, res, next) => {
    const { _id } = req.params;
    try {
        const item = await Country.findOne({ _id });
        res.status(200).send({ data: item });
    } catch (error) {
        next(error);
    }
}

module.exports = { get_country };