const mongoose = require('mongoose');

const PermissionCodesSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true, trim: true },
    desc: String
  },
  {
    timestamps: true
  }
);

module.exports = PermissionCodesSchema