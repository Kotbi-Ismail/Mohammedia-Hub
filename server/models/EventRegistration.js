import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  cin: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('EventRegistration', eventRegistrationSchema);