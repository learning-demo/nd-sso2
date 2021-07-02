const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash')

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true
    },
    permissionCodes: [{
      type: Schema.Types.ObjectId,
      ref: 'PermissionCode'
    }],
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    desc: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

RoleSchema.pre('save', function (next) {
  // unique permissionCodes array
  this.permissionCodes = _.uniqBy(this.permissionCodes, id => id.toString())
  next();
});

module.exports = RoleSchema