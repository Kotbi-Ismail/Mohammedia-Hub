import api from './api';

export interface Notification {
  id: string;
  message: string;
  type: 'REPORT' | 'PROPOSAL' | 'EVENT' | 'POLL';
  read: boolean;
  createdAt: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<Notification[]>('/notifications');
  return response.data;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await api.put(`/notifications/${notificationId}/read`);
};