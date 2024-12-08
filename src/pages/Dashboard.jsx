import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientStats from '../components/Dashboard/PatientStats';
import AppointmentQueue from '../components/Dashboard/AppointmentQueue';
import RecentActivity from '../components/Dashboard/RecentActivity';
import DashboardStats from '../components/Dashboard/DashboardStats';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null; // or return a loading spinner
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, {user.name}
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your patients today</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-800">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-gray-600">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <DashboardStats />
      <PatientStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentQueue />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;