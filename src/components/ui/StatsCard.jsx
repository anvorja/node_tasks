import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({
  icon: IconComponent,
  title,
  value,
  color = "blue",
  trend,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`
      bg-white rounded-2xl p-6 shadow-sm border border-gray-100 
      hover:shadow-lg transition-all duration-300 group ${className}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className={`
          p-3 rounded-xl bg-gradient-to-br from-${color}-50 to-${color}-100 
          group-hover:from-${color}-100 group-hover:to-${color}-200 
          transition-all duration-300
        `}>
          {IconComponent && <IconComponent className={`w-6 h-6 text-${color}-600`} />}
        </div>

        {trend !== undefined && (
          <div className={`
            flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
          `}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatsCard;