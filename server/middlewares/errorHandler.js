const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error', error: err.message });
};

module.exports = errorHandler;
