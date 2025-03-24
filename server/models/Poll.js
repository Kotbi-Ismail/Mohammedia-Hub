import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  title: String,
  description: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 },
    },
  ],
  totalVotes: { type: Number, default: 0 },
  endsAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Poll', pollSchema);