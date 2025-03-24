import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/');
    },
    onError: () => {
      toast.error('فشل تسجيل الدخول. يرجى التحقق من بياناتك.');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('auth.email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('auth.password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          {loginMutation.isPending ? 'جاري تسجيل الدخول...' : t('auth.login')}
        </button>
      </form>
    </div>
  );
};