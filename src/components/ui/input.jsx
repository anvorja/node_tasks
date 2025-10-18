import React from 'react';

const Input = ({
  label,
  icon: Icon,
  error,
  className = '',
  type = 'text',
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 border rounded-xl transition-all duration-200
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${Icon ? 'pl-12' : ''}
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 inline mr-2" />}
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && !label && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}

        <input
          type={type}
          className={`${baseClasses} ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 border rounded-xl transition-all duration-200 resize-none
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`${baseClasses} ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export const Select = ({
  label,
  icon: Icon,
  error,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 border rounded-xl transition-all duration-200 appearance-none bg-white
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${Icon ? 'pl-12' : ''}
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 inline mr-2" />}
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && !label && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}

        <select
          className={`${baseClasses} ${className}`}
          {...props}
        >
          {children}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;