import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import notificationRoutes from './routes/notifications.js';
import reportRoutes from './routes/reports.js';
import proposalRoutes from './routes/proposals.js';
import eventRoutes from './routes/events.js';
import pollRoutes from './routes/polls.js';


dotenv.config();


const app = express();

app.use(cors({
  origin:['http://localhost:5173','http://localhost:5174'],
  credentials:true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Mohammedia-citizen')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/polls', pollRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});