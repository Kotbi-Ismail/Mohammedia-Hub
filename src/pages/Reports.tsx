import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, AlertTriangle, Trash2, Edit } from 'lucide-react';
import { ReportCategory, ReportStatus } from '../types/report';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReports, createReport, deleteReport, updateReport } from '../services/report';

export const Reports: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingReportId, setEditingReportId] = useState<string | null>(null);

  const navigate = useNavigate();
  const isAuthenticated = true;

  const queryClient = useQueryClient();

  // جلب البلاغات من قاعدة البيانات
  const { data: fetchedReports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });

  // إنشاء بلاغ جديد
  const createReportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setCategory('');
      setEditingReportId(null);
    },
  });

  // حذف بلاغ
  const deleteReportMutation = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
    },
  });

  // تعديل بلاغ
  const updateReportMutation = useMutation({
    mutationFn: updateReport,
    onSuccess: () => {
      queryClient.invalidateQueries(['reports']);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setCategory('');
      setEditingReportId(null);
    },
  });

  const handleNewReportClick = () => {
    if (isAuthenticated) {
      setShowForm(true);
      setEditingReportId(null);
      setTitle('');
      setDescription('');
      setCategory('');
    } else {
      navigate('/login');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    if (editingReportId) {
      const updatedData = {
        title,
        description,
        category,
      };
      updateReportMutation.mutate({ id: editingReportId, updatedData });
    } else {
      const newReport = {
        title,
        description,
        category,
        status: ReportStatus.PENDING,
        location: { address: 'المحمدية' },
      };
      createReportMutation.mutate(newReport);
    }

    setShowForm(false);
    setTitle('');
    setDescription('');
    setCategory('');
    setEditingReportId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا البلاغ؟')) {
      deleteReportMutation.mutate(id);
    }
  };

  const handleEdit = (report: any) => {
    setShowForm(true);
    setEditingReportId(report._id);
    setTitle(report.title);
    setDescription(report.description);
    setCategory(report.category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Titre & Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">البلاغات</h1>
        <button
          onClick={handleNewReportClick}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700"
        >
          <Plus className="h-5 w-5" />
          بلاغ جديد
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 relative">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-semibold mb-4">
            {editingReportId ? 'تعديل البلاغ' : 'إضافة بلاغ جديد'}
          </h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="عنوان البلاغ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="وصف البلاغ"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">اختر التصنيف</option>
              {Object.values(ReportCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              {editingReportId ? 'تحديث البلاغ' : 'إرسال البلاغ'}
            </button>
          </form>
        </div>
      )}

      {/* Liste des بلاغات */}
      <div className="grid gap-6">
        {fetchedReports.map((report) => (
          <div key={report._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{report.location?.address}</span>
                  <span>•</span>
                  <span>{new Date(report.createdAt).toLocaleDateString('ar-MA')}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${report.status === ReportStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' :
                    report.status === ReportStatus.RESOLVED ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {report.status}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(report)}
                    className="text-blue-600 hover:text-blue-800"
                    title="تعديل"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-600 hover:text-red-800"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};