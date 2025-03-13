import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AlertTriangle, LightbulbIcon, Calendar, BarChart, MapPin } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'البلاغات',
      description: 'أبلغ عن المشاكل في مدينتك وتابع حالة معالجتها',
      link: '/reports',
    },
    {
      icon: <LightbulbIcon className="h-6 w-6" />,
      title: 'المقترحات',
      description: 'شارك بأفكارك لتحسين المدينة وصوت على مقترحات الآخرين',
      link: '/proposals',
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'الفعاليات',
      description: 'اكتشف الأحداث القادمة في المدينة وسجل حضورك',
      link: '/events',
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'الاستطلاعات',
      description: 'شارك في استطلاعات الرأي حول قضايا المدينة',
      link: '/polls',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'خريطة المدينة',
      description: 'استكشف الخدمات والمرافق في مدينة المحمدية',
      link: '/map',
    },
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          مرحباً بكم في بوابة مواطني المحمدية
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          منصتكم للمشاركة في تطوير وتحسين مدينتنا الجميلة
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-emerald-700 mt-16 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">+500</div>
              <div className="text-emerald-100">بلاغ تم حله</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">+1000</div>
              <div className="text-emerald-100">مواطن مشارك</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">+50</div>
              <div className="text-emerald-100">فعالية منظمة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">+200</div>
              <div className="text-emerald-100">مقترح مقدم</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};