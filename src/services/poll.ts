import api from './api';

export const fetchPolls = async () => {
  const response = await api.get('/polls');
  return response.data;
};

export const createPoll = async (pollData: any) => {
  const response = await api.post('/polls', pollData);
  return response.data;
};

export const voteOnPollOption = async (pollId: string, optionId: string) => {
  const response = await api.post('/polls/vote', { pollId, optionId });
  return response.data;
};