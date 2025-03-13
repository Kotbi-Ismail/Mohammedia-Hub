import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Clock } from 'lucide-react';

export const Polls: React.FC = () => {
  const { t } = useTranslation();

  const polls = [
    {
      id: '1',
      title: 'تطوير وسائل النقل العام',
      description: 'ما هي أولوياتكم في تحسين خدمات النقل العام في المدينة؟',
      options: [
        { id: '1', text: 'زيادة عدد الحافلات', votes: 234 },
        { id: '2', text: 'تحسين جودة المحطات', votes: 156 },
        { id: '3', text: 'تخفيض الأسعار', votes: 189 },
        { id: '4', text: 'توسيع شبكة الخطوط', votes: 278 },
      ],
      totalVotes: 857,
      endsAt: '2024-04-01T00:00:00Z',
    },
    // More polls would be fetched from the API
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الاستطلاعات</h1>
      </div>

      <div className="grid gap-6">
        {polls.map((poll) => (
          <div key={poll.id} className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{poll.title}</h3>
              <p className="text-gray-600">{poll.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="h-5 w-5" />
                <span>ينتهي في {new Date(poll.endsAt).toLocaleDateString('ar-MA')}</span>
              </div>
            </div>

            <div className="space-y-4">
              {poll.options.map((option) => {
                const percentage = Math.round((option.votes / poll.totalVotes) * 100);
                
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="text-gray-500">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              {poll.totalVotes} صوت
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};