import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['urban_development', 'environment','culture' ,'education', 'health','other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['under_review', 'approved', 'implemented', 'rejected'],
    default: 'under_review',
  },
  budget: { type: Number, default: 0 },
  timeline: { type: String, default: '' },
  votes: { type: Number, default: 0 },
  userId: { type: String, default: '' },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Proposal', proposalSchema);