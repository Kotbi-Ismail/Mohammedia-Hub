// models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['infrastructure', 'sanitation', 'lighting', 'safety', 'other'],
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'],
    default: 'pending',
  },
  images: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Report', reportSchema);