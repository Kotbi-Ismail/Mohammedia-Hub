import express from 'express';
import {
  getAllProposals,
  createProposal,
  likeProposal,
  dislikeProposal,
} from '../controllers/proposalController.js';

const router = express.Router();

router.get('/', getAllProposals);
router.post('/', createProposal);
router.put('/:id/like', likeProposal);
router.put('/:id/dislike', dislikeProposal);

export default router;