const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  lastDate: { type: Date },
  company: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Job', JobSchema);