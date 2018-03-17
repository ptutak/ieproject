'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthorModel = exports.AuthorSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _model = require('../book/model');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var AuthorSchema = new _mongoose2.default.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    date_of_birth: {
        type: Date
    },
    books: {
        type: [_mongoose2.default.Schema.Types.ObjectId],
        ref: 'BookSchema'
    }
});

AuthorSchema.methods = {
    view: function view() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'list';

        switch (type) {
            case 'list':
                return {
                    id: this.id,
                    first_name: this.first_name
                };
            default:
                return {
                    id: this.id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    date_of_birth: this.date_of_birth
                };
        }
    }
};

var AuthorModel = _mongoose2.default.model('authors', AuthorSchema);
exports.AuthorSchema = AuthorSchema;
exports.AuthorModel = AuthorModel;
exports.default = AuthorModel;
//# sourceMappingURL=model.js.map