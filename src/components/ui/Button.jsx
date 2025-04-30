// File: src/components/ui/Button.jsx

import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  disabled = false,
}) => {
  const base =
    'px-4 py-2 rounded-md font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames(base, variants[variant], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
