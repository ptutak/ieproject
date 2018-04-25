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


// Changing field value
UserSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }
  return email
});

// Doing something before saving
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const rounds = 9;
  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash;
    next()
  }).catch(next)
});

// Adds static fields
UserSchema.statics = {
    roles
};

UserSchema.methods = {
    view() {
        let fields = ['id', 'name', 'picture'];
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
