import express from 'express';
import { getAllEvents, createEvent } from '../controllers/eventController.js';
import { registerToEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.post('/event-register', registerToEvent);

export default router;