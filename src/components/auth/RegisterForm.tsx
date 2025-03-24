/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { register as registerUser } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  confirmEmail: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  cnie: z.string().regex(/^[A-Z]{1,2}[0-9]{5,6}$/, 'رقم البطاقة الوطنية غير صالح'),
  captchaToken: z.string().min(1, 'يرجى التحقق من أنك لست روبوتًا'),
}).refine((data) => data.email === data.confirmEmail, {
  message: 'البريد الإلكتروني غير متطابق',
  path: ['confirmEmail'],
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/');
    },
    onError: () => {
      toast.error('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaToken(value || '');
    setValue('captchaToken', value || '');
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t('auth.fullName')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.fullNamePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('auth.emailAddress')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.emailAddressPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Confirm Email Field */}
        <div>
          <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
            {t('auth.confirmEmailAddress')}
          </label>
          <input
            type="email"
            id="confirmEmail"
            {...register('confirmEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.confirmEmailAddressPlaceholder')}
          />
          {errors.confirmEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmEmail.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('auth.passwordField')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.passwordPlaceholder')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            {t('auth.confirmPasswordField')}
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.confirmPasswordPlaceholder')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* CNIE Field */}
        <div>
          <label htmlFor="cnie" className="block text-sm font-medium text-gray-700">
            {t('auth.nationalIdCard')}
          </label>
          <input
            type="text"
            id="cnie"
            {...register('cnie')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder={t('auth.nationalIdCardPlaceholder')}
          />
          {errors.cnie && (
            <p className="mt-1 text-sm text-red-600">{errors.cnie.message}</p>
          )}
        </div>

        {/* CAPTCHA Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('auth.securityVerification')}
          </label>
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LdGbvkqAAAAAOlA1ag-JrVnnGopHAFR7Cf9vuSK" 
              onChange={handleCaptchaChange}
            />
          </div>
          {errors.captchaToken && (
            <p className="mt-1 text-sm text-red-600">{errors.captchaToken.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          {registerMutation.isPending ? t('auth.creatingAccount') : t('auth.createAccount')}
        </button>
      </form>
    </div>
  );
};