import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Filter, Plus } from 'lucide-react';
import { ReportStatus, ReportCategory } from '../types/report';

export const Reports: React.FC = () => {
  const { t } = useTranslation();

  const reports = [
    {
      id: '1',
      title: 'إصلاح إنارة الشارع',
      description: 'الإنارة العمومية معطلة في شارع الحسن الثاني منذ أسبوع',
      category: ReportCategory.LIGHTING,
      status: ReportStatus.IN_PROGRESS,
      location: {
        address: 'شارع الحسن الثاني، المحمدية',
      },
      createdAt: '2024-03-15T10:00:00Z',
    },
    // More reports would be fetched from the API
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">البلاغات</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700">
          <Plus className="h-5 w-5" />
          بلاغ جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex gap-4">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
              <option value="">جميع التصنيفات</option>
              {Object.values(ReportCategory).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
              <option value="">جميع الحالات</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{report.location.address}</span>
                  <span>•</span>
                  <span>{new Date(report.createdAt).toLocaleDateString('ar-MA')}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${report.status === ReportStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' : 
                    report.status === ReportStatus.RESOLVED ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {report.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};