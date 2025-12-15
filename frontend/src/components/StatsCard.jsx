import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
        <Icon className={colorClasses[color]} size={32} />
      </div>
    </div>
  );
};

export default StatsCard;