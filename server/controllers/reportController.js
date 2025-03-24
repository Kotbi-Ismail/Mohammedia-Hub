import Report from '../models/Report.js';

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب البلاغات' });
  }
};

export const createReport = async (req, res) => {
  try {
    const newReport = await Report.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة البلاغ' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف البلاغ' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الحذف' });
  }
};

export const updateReport = async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في التعديل' });
  }
};