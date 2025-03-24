import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users } from 'lucide-react';
import { EventCategory } from '../types/event';
import { registerToEvent } from '../services/event'; // ← تم إضافة الاستيراد هنا

export const Events: React.FC = () => {
  const { t } = useTranslation();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cin: '',
    address: '',
  });

  const events = [
    {
      id: '1',
      title: 'مهرجان المحمدية الثقافي',
      description: 'مهرجان سنوي يحتفي بالثقافة والفنون المغربية',
      category: EventCategory.CULTURAL,
      startDate: '2024-04-15T18:00:00Z',
      endDate: '2024-04-17T22:00:00Z',
      location: {
        name: 'ساحة الحرية',
        address: 'ساحة الحرية، المحمدية',
      },
      attendees: 120,
      maxAttendees: 500,
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80',
    },
    // More events would be fetched from the API
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerToEvent(formData); // ← تم إرسال البيانات للـ backend
      alert('تم تسجيل حضورك بنجاح');
      setIsFormVisible(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        cin: '',
        address: '',
      });
    } catch (error) {
      console.error('خطأ أثناء التسجيل:', error);
      alert('حدث خطأ أثناء التسجيل، حاول مجددًا');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الفعاليات</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(event.startDate).toLocaleDateString('ar-MA')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{event.attendees} / {event.maxAttendees}</span>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                onClick={() => setIsFormVisible(true)}
              >
                سجل حضورك
              </button>

              {isFormVisible && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      الاسم
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 border rounded-lg w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 border rounded-lg w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 border rounded-lg w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
                      رقم بطاقة التعريف الوطنية
                    </label>
                    <input
                      type="text"
                      id="cin"
                      name="cin"
                      value={formData.cin}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 border rounded-lg w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      العنوان
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 border rounded-lg w-full"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsFormVisible(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      إرسال
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};