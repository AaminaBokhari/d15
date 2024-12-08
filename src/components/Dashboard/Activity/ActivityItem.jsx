import React from 'react';
import PropTypes from 'prop-types';

function ActivityItem({ activity }) {
  const { icon: Icon, bgColor, color, patient, action, time } = activity;

  return (
    <div className="flex items-start space-x-4">
      <div className={`${bgColor} p-3 rounded-lg`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800">{patient}</p>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{action}</p>
      </div>
    </div>
  );
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    patient: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
  }).isRequired
};

export default ActivityItem;