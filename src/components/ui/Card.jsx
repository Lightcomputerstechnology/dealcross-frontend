// File: src/components/ui/Card.jsx

import React from 'react';
import classNames from 'classnames';

export function Card({ children, className = '', elevated = false, borderless = false }) {
  const cardClasses = classNames(
    'rounded-lg p-4 transition',
    {
      'shadow-md hover:shadow-lg': elevated,
      'border border-gray-200 dark:border-gray-700': !borderless,
      'bg-white dark:bg-gray-900 text-gray-900 dark:text-white': true,
    },
    className
  );

  return <div className={cardClasses}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
