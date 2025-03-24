import React from 'react';
import { useTranslation } from 'react-i18next';

interface RTLProviderProps {
  children: React.ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  
  React.useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
};