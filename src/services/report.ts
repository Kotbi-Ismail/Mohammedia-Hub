import api from './api';
import { Report } from '../types/report';

// جلب البلاغات
export const fetchReports = async (): Promise<Report[]> => {
  const response = await api.get('/reports');
  return response.data;
};

// إضافة بلاغ
export const createReport = async (reportData: Partial<Report>): Promise<Report> => {
  const response = await api.post('/reports', reportData);
  return response.data;
};

// حذف بلاغ
export const deleteReport = async (id: string): Promise<void> => {
  await api.delete(`/reports/${id}`);
};

// تعديل بلاغ
export const updateReport = async ({ id, updatedData }: { id: string; updatedData: Partial<Report> }) => {
  const response = await api.put(`/reports/${id}`, updatedData);
  return response.data;
};