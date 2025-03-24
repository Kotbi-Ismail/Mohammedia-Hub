import express from 'express';
import {
  getAllReports,
  createReport,
  deleteReport,
  updateReport,
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/', getAllReports);
router.post('/', createReport);
router.delete('/:id', deleteReport);
router.put('/:id', updateReport);

export default router;