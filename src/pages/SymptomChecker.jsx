import React from 'react';
import SymptomCheckerForm from '../components/AI/SymptomCheckerForm';
import SymptomCheckerResults from '../components/AI/SymptomCheckerResults';
import { FaBrain, FaStethoscope } from 'react-icons/fa';

function SymptomChecker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-full">
          <FaBrain className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Symptom Checker</h1>
          <p className="text-gray-600 mt-1">Get instant AI-powered health insights based on your symptoms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SymptomCheckerForm />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <FaStethoscope className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">How It Works</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">1. Select all symptoms you're experiencing</p>
              <p className="text-gray-600">2. Click analyze to get AI-powered insights</p>
              <p className="text-gray-600">3. Review the potential conditions and their likelihood</p>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Note: This tool is for informational purposes only and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;