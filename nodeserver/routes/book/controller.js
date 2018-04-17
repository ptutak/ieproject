const model = require('./model').model;
const successJSON = require('../service/response').successJSON;
const notFound = require('../service/response').notFound;


module.exports.index = function(req, res, next) {
    return model
        .find({})
        .then(
            (model) => {
                return model.map((schema) => schema.view())
            })
        .then(
            successJSON(res)
        ).catch(next);

};


module.exports.show = function(req, res, next){
    const id = req.params.id;
    return model.findById(id).exec()
        .then((book) => book ? book.view('full') : null)
        .then(successJSON(res))
        .catch(notFound(res))
};

module.exports.create = function(req, res, next){
    const body = req.body;
    model.create(body)
        .then((book) => book.view('full'))
        .then(successJSON(res))
        .catch(next)
};

module.exports.update = function(req, res, next){
    const id = req.params.id;
    const body = req.body;

    return model.findById(id)
        .then(notFound(res))
        .then((book) => book ? Object.assign(book, body).save() : null)
        .then((book) => book ? book.view('full') : null)
        .then(successJSON(res))
        .catch(next)
};

module.exports.addAuthor = function(req,res,next){
    const id = req.params.id;
    const authorId=req.params.author;
    return model.findById(id)
        .then(notFound(res))
        .then((book)=>{
            if (book){
                book.authors.push(authorId);
                book.save();
                return book;
            }
            return null;
        })
        .then((book) => book ? book.view() : null)
        .then(successJSON(res))
        .catch(next);
};

module.exports.removeAuthor = function(req,res,next){
    const id = req.params.id;
    const authorId=req.params.author;
    return model.findById(id)
        .then(notFound(res))
        .then((book)=>{
            if (book){
                book.authors.pull(authorId);
                book.save();
                return book;
            }
            return null;
        })
        .then((book) => book ? book.view() : null)
        .then(successJSON(res))
        .catch(next);
};

module.exports.delete = function(req, res, next){
    const id = req.params.id;
    return model.findById(id)
        .then(notFound(res))
        .then((book) => book ? book.remove() : null)
        .then(successJSON(res, 204))
        .catch(next)
};

/*
// ---

module.exports.searchByName = function(req, res, next){
    const name = req.params.name;

    model.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, book) {
            if (!book)
                return notFound(res)(book);
            successJSON(res)(book.view())
        })
};

module.exports.searchByHeight = function(req, res, next){
    const min = req.params.min;
    const max = req.params.max;

    model.find({
            'height' : { $lte :  max, $gte :  min},
        },
        function (err, book) {
            if (!book)
                return notFound(res)(book);
            successJSON(res)(book)
        })
};


module.exports.searchByBirthday = function(req, res, next){
    const min = new Date(req.params.min);
    const max = new Date(req.params.max);

    model.find({
        'birthday' : { $lte :  max, $gte :  min},
    })
        .then((model) => model.map((book) => book.view('full')))
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
            .then((model) => model.map((book) => book.view())),
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
        .then((model) => model.map((book) => book.view('full')))
        .then(successJSON(res))
        .catch(next)

};
*/