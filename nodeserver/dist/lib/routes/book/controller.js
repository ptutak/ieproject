'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index2 = exports.index = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _response = require('../service/response');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var index = exports.index = function index(req, res, next) {
    return _model2.default.find({}).then(function (model) {
        model.map(function (schema) {
            return schema.view();
        });
    }).then(function (result, status) {
        res.json(result);
    }).catch(next);
};

var index2 = exports.index2 = function index2(req, res, next) {
    return _model2.default.find({}).then(function (model) {
        model.map(function (schema) {
            return schema.view();
        });
    }).then((0, _response.success)(res)).catch(next);
};

/*
export const show = (req, res, next) => {
    const id = req.params.id
    return AuthorModel.findById(id).exec()
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
}

export const create = (req, res, next) => {
    const body = req.body
    AuthorModel.create(body)
        .then((actor) => actor.view('full'))
        .then(success(res))
        .catch(next)
}

export const update = (req, res, next) => {
    const id = req.params.id
    const body = req.body

    return AuthorModel.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? Object.assign(actor, body).save() : null)
        .then((actor) => actor ? actor.view('full') : null)
        .then(success(res))
        .catch(next)
}

export const destroy = (req, res, next) => {
    const id = req.params.id
    return AuthorModel.findById(id)
        .then(notFound(res))
        .then((actor) => actor ? actor.remove() : null)
        .then(success(res, 204))
        .catch(next)
}


// ---

export const searchByName = (req, res, next) => {
    const name = req.params.name

    AuthorModel.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor.view())
        })
}

export const searchByHeight = (req, res, next) => {
    const min = req.params.min
    const max = req.params.max

    AuthorModel.find({
            'height' : { $lte :  max, $gte :  min},
        },
        function (err, actor) {
            if (!actor)
                return notFound(res)(actor);
            success(res)(actor)
        })
}


export const searchByBirthday = (req, res, next) => {
    const min = new Date(req.params.min)
    const max = new Date(req.params.max)

    AuthorModel.find({
        'birthday' : { $lte :  max, $gte :  min},
    })
        .then((AuthorModel) => AuthorModel.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)
}

export const count = (req, res, next) => {
    AuthorModel.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
}

export const listcount = (req, res, next) => {
    Promise.all([
        AuthorModel.find({})
            .then((AuthorModel) => AuthorModel.map((actor) => actor.view())),
        AuthorModel.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
}

export const paginatedIndex = (req, res, next) => {
    // Call it as: http://localhost:9000/api/AuthorModel/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000
    const skip = parseInt(req.query.skip) || 0

    return AuthorModel.find()
        .limit(limit)
        .skip(skip)
        .sort({birthday: -1})
        .then((AuthorModel) => AuthorModel.map((actor) => actor.view('full')))
        .then(success(res))
        .catch(next)

}
*/
//# sourceMappingURL=controller.js.map