
import React from 'react';

interface SensorCardProps {
  label: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit, icon, color }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    green: 'bg-green-100 text-green-600 border-green-200',
  };

  return (
    <div className={`p-4 rounded-3xl border-4 transition-all hover:scale-105 ${colorMap[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-white/50">
          {icon}
        </div>
        <span className="font-bold text-sm lg:text-base">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black space-font">{value}</span>
        <span className="text-sm font-medium opacity-80">{unit}</span>
      </div>
    </div>
  );
};

export default SensorCard;
