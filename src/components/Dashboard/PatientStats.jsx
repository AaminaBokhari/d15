import React from 'react';
import { FaUserInjured, FaCalendarCheck, FaClock, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PatientStats() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patients',
        data: [12, 19, 15, 17, 14, 13, 15],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Patient Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaUserInjured className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">Total Patients</h3>
          <p className="text-2xl font-semibold text-gray-900">1,284</p>
          <span className="text-sm text-green-500">↑ 12% this month</span>
        </div>
      </div>
      
      <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
        <div className="p-3 bg-green-100 rounded-full">
          <FaCalendarCheck className="h-6 w-6 text-green-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">Today's Appointments</h3>
          <p className="text-2xl font-semibold text-gray-900">12</p>
          <span className="text-sm text-blue-500">3 upcoming</span>
        </div>
      </div>
      
      <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
        <div className="p-3 bg-purple-100 rounded-full">
          <FaClock className="h-6 w-6 text-purple-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Reports</h3>
          <p className="text-2xl font-semibold text-gray-900">5</p>
          <span className="text-sm text-orange-500">Due today</span>
        </div>
      </div>

      <div className="md:col-span-1 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Patient Trend</h3>
          <FaChartLine className="h-5 w-5 text-blue-500" />
        </div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PatientStats;