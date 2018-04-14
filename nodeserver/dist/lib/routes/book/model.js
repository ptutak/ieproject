'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BookModel = exports.BookSchema = undefined;

var _model = require('../author/model');

var mongoose = require('mongoose');

//create a schema
var BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    authors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'AuthorSchema'
    },
    year: {
        type: Date
    }
});

BookSchema.methods = {
    view: function view() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'list';

        switch (type) {
            case 'list':
                return {
                    id: this.id,
                    title: this.title
                };
            default:
                return {
                    id: this.id,
                    title: this.title,
                    authors: this.authors,
                    year: this.year
                };
        }
    }
};

var BookModel = mongoose.model('books', BookSchema);
exports.BookSchema = BookSchema;
exports.BookModel = BookModel;
exports.default = BookModel;
//# sourceMappingURL=model.js.map