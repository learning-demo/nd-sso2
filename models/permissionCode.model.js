const mongoose = require('mongoose');

const PermissionCodesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    desc: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = PermissionCodesSchema;
