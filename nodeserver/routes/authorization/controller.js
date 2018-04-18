const sign = require('../service/jwt').sign;
const successJSON = require('../service/response').successJSON;

module.exports.login = (req, res, next) => {
  let user = req.user;
  sign(user.id)
      .then(token => {return {token}})
    .then(successJSON(res, 201))
    .catch(next)
};
