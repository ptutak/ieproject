module.exports.successJSON = function(res, status) {
    return (entity) => {
        if (entity) {
            res.status(status || 200).json(entity);
        }
        return null;
    };
};


module.exports.notFound = function(res) {
    return (entity) => {
        if (!entity || entity.name === 'CastError')
            res.status(404).end();
        return entity;
    };
};
