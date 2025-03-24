import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { voteOnPollOption } from '../services/poll'; // استدعاء التصويت من الـ backend

export const Polls: React.FC = () => {
  const { t } = useTranslation();

  const [polls, setPolls] = useState([
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
  ]);

  // فقط هاد الفنكشن اللي تبدلات باش تخدم مع backend
  const handleVote = async (pollId: string, optionId: string) => {
    const poll = polls.find((p) => p.id === pollId);
    if (!poll) return;

    const optionIndex = poll.options.findIndex((opt) => opt.id === optionId);
    if (optionIndex === -1) return;

    try {
      await voteOnPollOption(pollId, optionIndex); // التصويت الحقيقي
      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll.id === pollId
            ? {
                ...poll,
                options: poll.options.map((opt, i) =>
                  i === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
                ),
                totalVotes: poll.totalVotes + 1,
              }
            : poll
        )
      );
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء التصويت');
    }
  };

  const addOptionToPoll = (pollId: string, optionText: string) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: [
                ...poll.options,
                { id: `temp-${Date.now()}`, text: optionText, votes: 0 },
              ],
            }
          : poll
      )
    );
  };

  const removeOptionFromPoll = (pollId: string, optionId: string) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.filter(
                (option) =>
                  !option.id.startsWith('temp-') || option.id !== optionId
              ),
            }
          : poll
      )
    );
  };

  const calculatePercentage = (votes: number, totalVotes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

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
                const percentage = calculatePercentage(option.votes, poll.totalVotes);

                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="text-gray-500">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${percentage}% `}}
                      />
                    </div>
                    <button
                      onClick={() => handleVote(poll.id, option.id)}
                      className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      صوت
                    </button>
                    {option.id.startsWith('temp-') && (
                      <button
                        onClick={() => removeOptionFromPoll(poll.id, option.id)}
                        className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              {poll.totalVotes} صوت
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="أضف خيارًا جديدًا"
                className="px-4 py-2 border rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                    addOptionToPoll(poll.id, (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};