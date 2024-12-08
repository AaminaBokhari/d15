import React from 'react';
import PropTypes from 'prop-types';

function StatCard({ title, value, trend, icon: Icon, gradient }) {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-xl shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="text-2xl opacity-80" />
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {trend && <p className="text-sm mt-2 opacity-90">{trend}</p>}
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  gradient: PropTypes.string.isRequired
};

export default StatCard;