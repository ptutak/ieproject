'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var success = function success(res, status) {
    var f = function f(entity) {
        if (entity) {
            res.status(status || 200).json(entity);
        }
        return null;
    };
    return f;
};

var notFound = function notFound(res) {
    var f = function f(entity) {
        if (!entity || entity.name === 'CastError') res.status(404).end();
        return entity;
    };
    return f;
};

exports.success = success;
exports.notFound = notFound;
//# sourceMappingURL=response.js.map