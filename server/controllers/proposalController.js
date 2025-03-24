import Proposal from '../models/Proposal.js';

// جلب جميع المقترحات
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب المقترحات' });
  }
};

// إنشاء مقترح جديد
export const createProposal = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status = 'under_review',
      budget = 0,
      timeline = '',
      userId = '',
      votes = 0,
    } = req.body;

    const newProposal = await Proposal.create({
      title,
      description,
      category,
      status,
      budget,
      timeline,
      userId,
      votes,
    });

    res.status(201).json(newProposal);
  } catch (error) {
    console.error('خطأ أثناء إنشاء المقترح:', error);
    res.status(500).json({ message: 'خطأ في إضافة المقترح' });
  }
};

// تسجيل إعجاب
export const likeProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'المقترح غير موجود' });

    proposal.likes += 1;
    await proposal.save();
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تسجيل الإعجاب' });
  }
};

// تسجيل عدم إعجاب
export const dislikeProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'المقترح غير موجود' });

    proposal.dislikes += 1;
    await proposal.save();
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تسجيل عدم الإعجاب' });
  }
};