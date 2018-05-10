const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const jwtSecret = require('../../config').jwtSecret;

// http://bluebirdjs.com/docs/api/promise.promisify.html
const jwtSign = Promise.promisify(jwt.sign);
//const jwtVerify = Promise.promisify(jwt.verify);
const sign=(id, options, method = jwtSign) => method({ id }, jwtSecret, options);

module.exports.sign = sign;
//module.exports.signSync = (id, options) => sign(id, options, jwt.sign);
//module.exports.verify = (token) => jwtVerify(token, jwtSecret);
