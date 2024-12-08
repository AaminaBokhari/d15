import React from 'react';
import { FaUserInjured, FaCheckCircle, FaClock, FaCalendarCheck } from 'react-icons/fa';

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Today's Patients</h3>
          <FaUserInjured className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">12</p>
        <p className="text-sm text-blue-100 mt-2">↑ 20% vs last week</p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Completed</h3>
          <FaCheckCircle className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">8</p>
        <p className="text-sm text-green-100 mt-2">4 appointments remaining</p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pending</h3>
          <FaClock className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">4</p>
        <p className="text-sm text-purple-100 mt-2">Next in 15 minutes</p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tomorrow</h3>
          <FaCalendarCheck className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">6</p>
        <p className="text-sm text-orange-100 mt-2">First at 9:00 AM</p>
      </div>
    </div>
  );
}

export default DashboardStats;