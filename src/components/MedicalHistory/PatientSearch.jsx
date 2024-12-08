import React from 'react';

function PatientSearch({ onSearch }) {
  return (
    <div className="mb-6">
      <div className="max-w-xl">
        <input
          type="text"
          placeholder="Search patient by name or ID..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default PatientSearch;