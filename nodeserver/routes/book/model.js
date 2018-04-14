const mongoose = require('mongoose')
const AuthorSchema =require('../author/model').schema;

//create a schema
const BookSchema = new mongoose.Schema({
    title : {
        type:String,
        trim:true
    },
    authors : {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'AuthorSchema'
    },
    year : {
        type:Date
    },
    imageURL : {
        type: String,
        trim:true
    }
});


BookSchema.methods = {
    view(type = 'full'){
        switch(type){
            case 'list':
                return {
                    id:this.id,
                    title:this.title
                };
            default:
                return {
                    id:this.id,
                    title:this.title,
                    authors:this.authors,
                    year:this.year,
                    imageURL:this.imageURL
                };
        }

    }
};

const BookModel = mongoose.model('books',BookSchema);
module.exports = {
    schema : BookSchema,
    model : BookModel
};
