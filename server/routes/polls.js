import express from 'express';
import { getPolls, createPoll, voteOption } from '../controllers/pollController.js';

const router = express.Router();

router.get('/', getPolls);
router.post('/', createPoll);
router.post('/vote', voteOption);

export default router;