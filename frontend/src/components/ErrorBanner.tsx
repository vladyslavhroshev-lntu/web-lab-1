import React from 'react';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div className="error-banner" role="alert">
      <strong>⚠️ Помилка зʼєднання з сервером</strong>
      {message}
    </div>
  );
};
