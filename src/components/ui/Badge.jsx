// File: src/components/ui/Badge.jsx

import React from 'react';
import classNames from 'classnames';

const Badge = ({ color = 'blue', children }) => {
  const badgeClasses = classNames(
    'inline-block px-2 py-1 rounded text-xs font-semibold',
    {
      'bg-blue-600 text-white': color === 'blue',
      'bg-green-600 text-white': color === 'green',
      'bg-yellow-500 text-white': color === 'yellow',
      'bg-red-600 text-white': color === 'red',
      'bg-gray-600 text-white': color === 'gray',
    }
  );

  return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
