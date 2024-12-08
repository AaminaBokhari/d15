import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';
import MedicalHistory from './pages/MedicalHistory';
import Chat from './pages/Chat';
import SymptomChecker from './pages/SymptomChecker';
import Sidebar from './components/Layout/Sidebar';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('doctor_token');

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          {isAuthenticated && <Sidebar />}
          <main className={`flex-1 overflow-y-auto p-6 ${!isAuthenticated ? 'w-full' : ''}`}>
            <Routes>
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
              />
              <Route 
                path="/register" 
                element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
              />
              <Route
                path="/"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/appointments"
                element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />}
              />
              <Route
                path="/prescriptions"
                element={isAuthenticated ? <Prescriptions /> : <Navigate to="/login" />}
              />
              <Route
                path="/medical-history"
                element={isAuthenticated ? <MedicalHistory /> : <Navigate to="/login" />}
              />
              <Route
                path="/chat"
                element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
              />
              <Route
                path="/symptom-checker"
                element={isAuthenticated ? <SymptomChecker /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;