import React from 'react';

interface HeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  badge = 'Практична робота №1',
  title,
  subtitle,
}) => {
  return (
    <header className="header">
      <span className="badge">{badge}</span>
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
};
