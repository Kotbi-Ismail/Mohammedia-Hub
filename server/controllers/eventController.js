import mongoose from 'mongoose';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js'; // استيراد الموديل الجديد للتسجيلات

// جلب جميع الفعاليات
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب الفعاليات' });
  }
};

// إنشاء فعالية جديدة
export const createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إضافة الفعالية' });
  }
};

// تسجيل الحضور في فعالية
export const registerToEvent = async (req, res) => {
  try {
    const registrationData = req.body;
    console.log('بيانات التسجيل:', registrationData);

    const newRegistration = new EventRegistration(registrationData);
    await newRegistration.save();

    res.status(201).json({ message: 'تم تسجيل الحضور بنجاح' });
  } catch (error) {
    console.error('❌ خطأ أثناء التسجيل:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء التسجيل في الفعالية' });
  }
};