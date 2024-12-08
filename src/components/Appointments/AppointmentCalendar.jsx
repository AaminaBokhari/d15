import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { mockAppointments } from '../../data/mockData';

function AppointmentCalendar() {
  const appointmentDates = mockAppointments.map(apt => new Date());

  const tileContent = ({ date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const hasAppointment = appointmentDates.some(
      aptDate => format(aptDate, 'yyyy-MM-dd') === formattedDate
    );
    
    return hasAppointment ? (
      <div className="h-2 w-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
    ) : null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Calendar
        tileContent={tileContent}
        className="mx-auto"
      />
    </div>
  );
}

export default AppointmentCalendar;