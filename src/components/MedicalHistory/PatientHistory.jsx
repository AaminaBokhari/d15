import React from 'react';
import { mockMedicalHistory } from '../../data/mockData';

function PatientHistory() {
  return (
    <div className="space-y-4">
      {mockMedicalHistory.map((record) => (
        <div key={record.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Visit Date: {record.date}</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Record #{record.id}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Diagnosis</h4>
              <p className="mt-1">{record.diagnosis}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Prescription</h4>
              <p className="mt-1">{record.prescription}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Lab Results</h4>
              <p className="mt-1">{record.labResults}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientHistory;