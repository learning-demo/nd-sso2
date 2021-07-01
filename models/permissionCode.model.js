const mongoose = require('mongoose');

const PermissionCodesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    desc: String,
  },
  {
    timestamps: true,
  }
);

module.exports = PermissionCodesSchema;
