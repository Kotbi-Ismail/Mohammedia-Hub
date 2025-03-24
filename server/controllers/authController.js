import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, cnie } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const cnieExists = await User.findOne({ cnie });
    if (cnieExists) {
      return res.status(400).json({ message: 'رقم البطاقة الوطنية مستخدم بالفعل' });
    }

    const user = await User.create({
      name,
      email,
      password,
      cnie,
    });

    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cnie:user.cnie,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const token = generateToken(user);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
  }
};