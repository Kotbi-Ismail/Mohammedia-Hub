import api from './api';
import { Event } from '../types/event';

// جلب الفعاليات
export const fetchEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};

// إنشاء فعالية جديدة
export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
  const response = await api.post('/events', eventData);
  return response.data;
};

// تسجيل مستخدم في الفعالية

export const registerToEvent = async (formData: {
  name: string;
  phone: string;
  email: string;
  cin: string;
  address: string;
}) => {
  const response = await api.post('/events/event-register', formData); // ✅ مهم يكون '/events/event-register'
  return response.data;
};