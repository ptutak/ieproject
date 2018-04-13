const model = require('./model').model;
const successJSON = require('../service/response').successJSON;
const notFound = require('../service/response').notFound;


module.exports.index = function(req, res, next) {
    return model
        .find({})
        .then(
            function(model){
                return model.map((schema) => schema.view())
            })
        .then(
            successJSON(res)
        ).catch(next);

};


module.exports.show = function(req, res, next){
    const id = req.params.id;
    return model.findById(id).exec()
        .then((author) => author ? author.view() : null)
        .then(successJSON(res))
        .catch(notFound(res))
};

module.exports.create = function(req, res, next){
    const body = req.body;
    model.create(body)
        .then((author) => author.view())
        .then(successJSON(res))
        .catch(next)
};

module.exports.update = function(req, res, next){
    const id = req.params.id;
    const body = req.body;

    return model.findById(id)
        .then(notFound(res))
        .then((author) => author ? Object.assign(author, body).save() : null)
        .then((author) => author ? author.view() : null)
        .then(successJSON(res))
        .catch(next)
};

module.exports.delete = function(req, res, next){
    const id = req.params.id;
    return model.findById(id)
        .then(notFound(res))
        .then((author) => author ? author.remove() : null)
        .then(successJSON(res, 204))
        .catch(next)
};

/*
// ---

module.exports.searchByName = function(req, res, next){
    const name = req.params.name;

    model.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, author) {
            if (!author)
                return notFound(res)(author);
            successJSON(res)(author.view())
        })
};

module.exports.searchByHeight = function(req, res, next){
    const min = req.params.min;
    const max = req.params.max;

    model.find({
            'height' : { $lte :  max, $gte :  min},
        },
        function (err, author) {
            if (!author)
                return notFound(res)(author);
            successJSON(res)(author)
        })
};


module.exports.searchByBirthday = function(req, res, next){
    const min = new Date(req.params.min);
    const max = new Date(req.params.max);

    model.find({
        'birthday' : { $lte :  max, $gte :  min},
    })
        .then((model) => model.map((author) => author.view('full')))
        .then(successJSON(res))
        .catch(next)
};

module.exports.count = function(req, res, next){
    model.count({})
        .then((count) => ({count: count}))
        .then(successJSON(res))
        .catch(next)
};

module.exports.listcount = function(req, res, next){
    Promise.all([
        model.find({})
            .then((model) => model.map((author) => author.view())),
        model.count({})
    ]).then(([list, count]) => successJSON(res)({list: list, count: count})).catch(next)
};

module.exports.paginatedIndex = function(req, res, next){
    // Call it as: http://localhost:9000/api/model/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000;
    const skip = parseInt(req.query.skip) || 0;

    return model.find()
        .limit(limit)
        .skip(skip)
        .sort({birthday: -1})
        .then((model) => model.map((author) => author.view('full')))
        .then(successJSON(res))
        .catch(next)

};
*/