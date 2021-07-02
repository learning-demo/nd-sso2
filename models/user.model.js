const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const _ = require('lodash')

const UserSchema = new Schema(
  {
    displayName: String,
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    roles: [{
      type: Schema.Types.ObjectId,
      ref: 'Role',
    }],
    salt: String,
    password: String,
    provider: String,
    providerData: {},
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  // hash password
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  // unique role array
  this.roles = _.uniqBy(this.roles, id => id.toString())
  next();
});

UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha512').toString('base64');
  } else {
    return password;
  }
};

UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = UserSchema;
