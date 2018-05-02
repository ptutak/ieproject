const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema=require('mongoose').Schema;

const roles = ['user', 'admin'];

const UserSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    trim: true
  },
  picture: {
    type: String,
    trim: true
  },
  role: {
      type: String,
      enum: roles,
      default: 'user'
  }}
  , {timestamps: true});



// Doing something before saving
UserSchema.pre('save', function (next) {
    if (!this.picture) {
        const hash = crypto.createHash('md5').update(this.email).digest('hex');
        this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
    }
    if (!this.isModified('password'))
        return next();
    const rounds = 9;
    bcrypt.hash(this.password, rounds).then((hash) => {
      this.password = hash;
      next()
    }).catch(next)
});

// Adds static fields
UserSchema.statics = {
    roles:roles
};

UserSchema.methods = {
    view(mode='full') {
        let fields=[];
        switch(mode){
            case 'full':
                fields=['id','name','role','picture', 'email'];
                break;
            case 'short':
                fields=['id'];
                break;
            default:
                fields=['id'];
        }

        let userView = {};
        fields.forEach((field) => {
            userView[field] = this[field]
        });
        return userView
    },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
};


const UserModel = mongoose.model('User', UserSchema);

module.exports={
    schema : UserSchema,
    model : UserModel
};
