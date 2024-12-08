import React, { useState } from 'react';
import AppointmentTable from './AppointmentTable';
import AppointmentFilters from './AppointmentFilters';
import { useAppointments } from '../../hooks/useAppointments';
import LoadingSpinner from '../common/LoadingSpinner';

function AppointmentOverview() {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
  });

  const { appointments, isLoading, error } = useAppointments();

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error loading appointments: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AppointmentFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="bg-white rounded-lg shadow-md">
        <AppointmentTable 
          data={appointments}
          filters={filters}
        />
      </div>
    </div>
  );
}

export default AppointmentOverview;