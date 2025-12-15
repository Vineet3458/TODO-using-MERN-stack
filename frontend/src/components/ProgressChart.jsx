import React from 'react';
import { BarChart3 } from 'lucide-react';

const ProgressChart = ({ progress }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-purple-600" size={24} />
        <h2 className="text-xl font-bold text-gray-800">7-Day Progress</h2>
      </div>
      <div className="flex items-end justify-between gap-2 h-32">
        {progress.map((day, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '100%' }}>
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-500"
                style={{ height: `${day.percentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{day.date}</span>
            <span className="text-xs text-gray-500">{day.completed}/{day.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;