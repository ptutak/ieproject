const mongoose = require('mongoose');
const BookSchema =require('../book/model').schema;


const AuthorSchema = new mongoose.Schema({
    first_name : {
        type:String,
        trim:true
    },
    last_name : {
        type:String,
        trim:true
    },
    date_of_birth :{
        type:Date
    },
    books:{
      type: [mongoose.Schema.Types.ObjectId],
        ref:'BookSchema'
    },
    imageURL:{
        type:String,
        trim:true
    }
});
AuthorSchema.methods = {
    view (type = 'full'){
        switch(type){
            case 'list':
                return {
                    id: this.id,
                    first_name: this.first_name,
                    last_name:this.last_name
                };
            default:
                return {
                    id: this.id,
                    first_name: this.first_name,
                    last_name:this.last_name,
                    date_of_birth:this.date_of_birth,
                    books:this.books,
                    imageURL:this.imageURL
                }
        }
    }
};

const AuthorModel = mongoose.model('authors', AuthorSchema);

module.exports= {
    schema : AuthorSchema,
    model : AuthorModel
};
