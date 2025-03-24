import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['cultural', 'sports', 'education', 'community', 'other'],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: {
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
  },
  organizer: { type: String, default: '' },
  attendees: { type: Number, default: 0 },
  maxAttendees: { type: Number },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Event', eventSchema);