const model = require('./model').model;
const success = require('../service/response').success;
const notFound = require('../service/response').notFound;

module.exports.index = function(req, res, next) {
    return model
        .find({})
        .then(
            function(model){
                model.map((schema) => schema.view())
            }
        )
        .then(
            function(result,status){
                res.json(result);
            }
        ).catch(next);

};


module.exports.index2 = function(req, res, next) {
    return model
        .find({})
        .then(
            function(model){
                model.map((schema) => schema.view())
            })
        .then(
            success(res,0)
        ).catch(next);

};


module.exports.show = function(req, res, next){
    const id = req.params.id;
    return model.findById(id).exec()
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
};

module.exports.create = function(req, res, next){
    const body = req.body;
    model.create(body)
        .then((actor) => actor.view('full'))
        .then(success(res))
        .catch(next)
};

module.exports.update = function(req, res, next){
    const id = req.params.id;
    const body = req.body;

    return model.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? Object.assign(actor, body).save() : null)
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(next)
};

module.exports.destroy = function(req, res, next){
    const id = req.params.id;
    return model.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? actor.remove() : null)
        .then(success(res, 204))
        .catch(next)
};

/*
// ---

module.exports.searchByName = function(req, res, next){
    const name = req.params.name;

    model.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor.view())
        })
};

module.exports.searchByHeight = function(req, res, next){
    const min = req.params.min;
    const max = req.params.max;

    model.find({
            'height' : { $lte :  max, $gte :  min},
        },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor)
        })
};


module.exports.searchByBirthday = function(req, res, next){
    const min = new Date(req.params.min);
    const max = new Date(req.params.max);

    model.find({
        'birthday' : { $lte :  max, $gte :  min},
    })
        .then((model) => model.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)
};

module.exports.count = function(req, res, next){
    model.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
};

module.exports.listcount = function(req, res, next){
    Promise.all([
        model.find({})
            .then((model) => model.map((actor) => actor.view())),
        model.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
};

module.exports.paginatedIndex = function(req, res, next){
    // Call it as: http://localhost:9000/api/model/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000;
    const skip = parseInt(req.query.skip) || 0;

    return model.find()
        .limit(limit)
        .skip(skip)
        .sort({birthday: -1})
        .then((model) => model.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)

};
*/