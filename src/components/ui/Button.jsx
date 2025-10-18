import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-xl
    transition-all duration-200 transform hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? 'pointer-events-none' : ''}
    ${className}
  `.trim();

  const renderIcon = () => {
    if (loading) {
      return (
        <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizes[size]}`} />
      );
    }

    if (Icon) {
      return <Icon className={iconSizes[size]} />;
    }

    return null;
  };

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;