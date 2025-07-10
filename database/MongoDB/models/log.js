const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { type: String, required: true },
  operation: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);