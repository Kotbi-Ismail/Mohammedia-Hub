import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm.tsx';

export const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {t('auth.register')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            تسجيل الدخول
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};