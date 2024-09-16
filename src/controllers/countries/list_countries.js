const list_countries = ({ Country }, { config }) => async (req, res, next) => {
    const { name } = req.query || {};
    let query = {};;
    if (name) query.name = { $regex: name, $options: 'i' };
    try {
        const items = await Country.find(query)
        res.status(200).send({ data: items });
    } catch (error) {
        console.log('error', error)
        next(error);
    }
}

module.exports = { list_countries };