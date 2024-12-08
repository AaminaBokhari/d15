import React, { useState } from 'react';
import { FaUserMd, FaPrescription, FaFlask } from 'react-icons/fa';
import ActivityItem from './ActivityItem';

function RecentActivity() {
  const [activities] = useState([
    {
      id: 1,
      type: 'appointment',
      patient: 'John Doe',
      action: 'completed checkup',
      time: '2 hours ago',
      icon: FaUserMd,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'prescription',
      patient: 'Jane Smith',
      action: 'prescribed medication',
      time: '3 hours ago',
      icon: FaPrescription,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      type: 'lab',
      patient: 'Robert Johnson',
      action: 'requested blood test',
      time: '5 hours ago',
      icon: FaFlask,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    }
  ]);

  const handleViewAll = () => {
    // Implement view all functionality
    console.log('View all activities clicked');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <button 
        onClick={handleViewAll}
        className="w-full mt-6 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
      >
        View All Activity →
      </button>
    </div>
  );
}

export default RecentActivity;