import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الإشعارات' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    
    res.json({ message: 'تم تحديث حالة الإشعار' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث الإشعار' });
  }
};