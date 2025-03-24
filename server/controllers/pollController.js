import Poll from '../models/Poll.js';

export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب الاستطلاعات' });
  }
};

export const createPoll = async (req, res) => {
  try {
    const newPoll = await Poll.create(req.body);
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة الاستطلاع' });
  }
};

export const voteOption = async (req, res) => {
  try {
    const { pollId, optionId } = req.body;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'الاستطلاع غير موجود' });

    const option = poll.options.id(optionId);
    if (!option) return res.status(404).json({ message: 'الخيار غير موجود' });

    option.votes += 1;
    poll.totalVotes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error('❌ خطأ أثناء التصويت:', error);
    res.status(500).json({ message: 'خطأ أثناء التصويت' });
  }
};