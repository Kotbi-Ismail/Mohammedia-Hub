import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      message: 'تم الرد على بلاغك',
      read: false,
    },
    {
      id: '2',
      message: 'تم قبول مقترحك',
      read: false,
    },
  ]);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleLogout = () => {
    logout();
    setUser(null);
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold">{t('app.name')}</h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-4 space-x-reverse">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.home')}
              </Link>
              <Link to="/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.reports')}
              </Link>
              <Link to="/proposals" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.proposals')}
              </Link>
              <Link to="/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.events')}
              </Link>
              <Link to="/polls" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.polls')}
              </Link>
              <Link to="/map" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-600">
                {t('nav.map')}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-emerald-600 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 text-gray-800 z-50">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-2 hover:bg-gray-100 ${
                            !notification.read ? 'bg-emerald-50' : ''
                          }`}
                        >
                          {notification.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/profile" className="p-2 rounded-full hover:bg-emerald-600">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-emerald-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-600"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-white text-emerald-700 hover:bg-gray-100"
                >
                  {t('auth.register')}
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-emerald-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.home')}
            </Link>
            <Link to="/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.reports')}
            </Link>
            <Link to="/proposals" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.proposals')}
            </Link>
            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.events')}
            </Link>
            <Link to="/polls" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.polls')}
            </Link>
            <Link to="/map" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
              {t('nav.map')}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-right px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
                  {t('auth.login')}
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">
                  {t('auth.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};