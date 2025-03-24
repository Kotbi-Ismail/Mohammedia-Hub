import api from './api';
import { Proposal } from '../types/proposal';

// جلب المقترحات
export const fetchProposals = async (): Promise<Proposal[]> => {
  const response = await api.get('/proposals');
  return response.data;
};

// إضافة مقترح جديد
export const createProposal = async (proposalData: Partial<Proposal>): Promise<Proposal> => {
  const response = await api.post('/proposals', proposalData);
  return response.data;
};

// تسجيل إعجاب (like)
export const likeProposal = async (id: string): Promise<Proposal> => {
  const response = await api.put(`/proposals/${id}/like`);
  return response.data;
};

// تسجيل عدم إعجاب (dislike)
export const dislikeProposal = async (id: string): Promise<Proposal> => {
  const response = await api.put(`/proposals/${id}/dislike`);
  return response.data;
};