import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPrescription, FaHistory, FaComments, FaBrain } from 'react-icons/fa';

function Sidebar() {
  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/appointments', icon: <FaCalendarAlt />, label: 'Appointments' },
    { path: '/prescriptions', icon: <FaPrescription />, label: 'Prescriptions' },
    { path: '/medical-history', icon: <FaHistory />, label: 'Medical History' },
    { path: '/chat', icon: <FaComments />, label: 'Chat' },
    { path: '/symptom-checker', icon: <FaBrain />, label: 'AI Symptom Checker' },
  ];

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Doctor Panel</h1>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;