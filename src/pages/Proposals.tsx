import React from 'react';
import { useTranslation } from 'react-i18next';
import { LightbulbIcon, ThumbsUp, Plus } from 'lucide-react';
import { ProposalStatus, ProposalCategory } from '../types/proposal';

export const Proposals: React.FC = () => {
  const { t } = useTranslation();

  const proposals = [
    {
      id: '1',
      title: 'إنشاء حديقة عامة',
      description: 'اقتراح لتحويل الأرض الفارغة في حي السلام إلى حديقة عامة للعائلات',
      category: ProposalCategory.URBAN_DEVELOPMENT,
      status: ProposalStatus.UNDER_REVIEW,
      votes: 156,
      createdAt: '2024-03-10T08:00:00Z',
    },
    // More proposals would be fetched from the API
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">المقترحات</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700">
          <Plus className="h-5 w-5" />
          مقترح جديد
        </button>
      </div>

      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <LightbulbIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
                <p className="text-gray-600 mb-4">{proposal.description}</p>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${proposal.status === ProposalStatus.APPROVED ? 'bg-green-100 text-green-800' :
                      proposal.status === ProposalStatus.IMPLEMENTED ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {proposal.status}
                  </span>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{proposal.votes}</span>
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