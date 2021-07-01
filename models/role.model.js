const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    permissionCodes: [String],
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    desc: String
  },
  {
    timestamps: true
  }
);

module.exports = RoleSchema