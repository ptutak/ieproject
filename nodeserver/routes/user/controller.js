const notFound = require('../service/response').notFound;
const successJSON = require('../service/response').successJSON;
const model = require('./model').model;

module.exports.showMe = ({ user }, res) =>
  res.json(user.view());

module.exports.create = (req, res, next) => {
    let user={};
    user.email=req.body.email;
    user.name=req.body.name;
    user.password=req.body.password;
    model.create(user)
        .then((user) => user.view())
        .then(successJSON(res, 201))
        .catch((err) => {
            /* istanbul ignore else */
            if (err.code === 11000) {
                res.status(409).json({
                    valid: false,
                    param: 'email',
                    message: 'email already registered'
                })
            } else {
                next(err)
            }
        })
};

module.exports.update = ({body, params, user}, res, next) => {
    const {email, password, name} = body;

    model.findById(params.id === 'me' ? user.id : params.id)
        .then(notFound(res))
        .then((result) => {
            if (!result) return null;

            const isSelfUpdate = user.id === result.id;
            if (isSelfUpdate) return result;

            const isAdmin = user.role === 'admin';
            if (!isAdmin) {
                res.status(401).json({
                    valid: false,
                    message: 'You can\'t change other user\'s data'
                });
                return null
            }
            return result
        })
        .then((user) => {
            return user ? Object.assign(user, {email, password, name}).save() : null
        })
        .then((user) => user ? user.view('full') : null)
        .then(successJSON(res))
        .catch(next)
};


module.exports.destroy = ({ params }, res, next) =>
  model.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(successJSON(res, 204))
    .catch(next);
