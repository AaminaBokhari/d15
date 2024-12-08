import React from 'react';
import { FaUserMd, FaPrescription, FaFlask } from 'react-icons/fa';

function RecentActivity() {
  const activities = [
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
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`${activity.bgColor} p-3 rounded-lg`}>
              <activity.icon className={`h-5 w-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">{activity.patient}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{activity.action}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 text-blue-500 hover:text-blue-600 text-sm font-medium">
        View All Activity →
      </button>
    </div>
  );
}

export default RecentActivity;