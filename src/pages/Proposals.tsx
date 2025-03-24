import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LightbulbIcon, ThumbsUp, ThumbsDown, Plus, X } from 'lucide-react';
import { ProposalStatus, ProposalCategory } from '../types/proposal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProposals, createProposal, likeProposal, dislikeProposal } from '../services/proposal';

export const Proposals: React.FC = () => {
  const { t } = useTranslation();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const queryClient = useQueryClient();

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: fetchProposals,
  });

  const createProposalMutation = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      queryClient.invalidateQueries(['proposals']);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setCategory('');
    },
  });

  const likeProposalMutation = useMutation({
    mutationFn: likeProposal,
    onSuccess: () => queryClient.invalidateQueries(['proposals']),
  });

  const dislikeProposalMutation = useMutation({
    mutationFn: dislikeProposal,
    onSuccess: () => queryClient.invalidateQueries(['proposals']),
  });

  const handleLike = (proposalId: string) => {
    likeProposalMutation.mutate(proposalId);
  };

  const handleDislike = (proposalId: string) => {
    dislikeProposalMutation.mutate(proposalId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newProposal = {
      title,
      description,
      category,
      status: ProposalStatus.UNDER_REVIEW,
    };
    createProposalMutation.mutate(newProposal);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">المقترحات</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700"
        >
          <Plus className="h-5 w-5" />
          مقترح جديد
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 relative">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-semibold mb-4">إضافة مقترح جديد</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="عنوان المقترح"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="وصف المقترح"
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
              {Object.values(ProposalCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              إرسال المقترح
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <div key={proposal._id} className="bg-white rounded-lg shadow p-6">
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
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(proposal._id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span>{proposal.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(proposal._id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                    >
                      <ThumbsDown className="h-5 w-5" />
                      <span>{proposal.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};