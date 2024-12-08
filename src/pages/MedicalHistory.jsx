import React, { useState } from 'react';
import PatientHistory from '../components/MedicalHistory/PatientHistory';
import PatientSearch from '../components/MedicalHistory/PatientSearch';

function MedicalHistory() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real application, this would trigger an API call to search patients
    console.log('Searching for:', query);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medical History</h1>
      <PatientSearch onSearch={handleSearch} />
      <PatientHistory />
    </div>
  );
}

export default MedicalHistory;