import React from 'react';
import { FaUserInjured, FaCheckCircle, FaClock, FaCalendarCheck } from 'react-icons/fa';
import StatCard from './StatCard';

function DashboardStats() {
  const stats = [
    {
      title: "Today's Patients",
      value: 12,
      trend: "↑ 20% vs last week",
      icon: FaUserInjured,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Completed",
      value: 8,
      trend: "4 appointments remaining",
      icon: FaCheckCircle,
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Pending",
      value: 4,
      trend: "Next in 15 minutes",
      icon: FaClock,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Tomorrow",
      value: 6,
      trend: "First at 9:00 AM",
      icon: FaCalendarCheck,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default DashboardStats;