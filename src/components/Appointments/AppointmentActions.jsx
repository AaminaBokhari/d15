import React, { useState } from 'react';
import RescheduleModal from './RescheduleModal';
import CancelModal from './CancelModal';
import { rescheduleAppointment, cancelAppointment } from '../../services/appointmentService';
import { toast } from 'react-toastify';

function AppointmentActions({ appointment, onUpdate }) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleReschedule = async (appointmentId, newDateTime) => {
    try {
      const updatedAppointment = await rescheduleAppointment(appointmentId, newDateTime);
      onUpdate(updatedAppointment);
      toast.success('Appointment rescheduled successfully');
    } catch (error) {
      toast.error('Failed to reschedule appointment');
      throw error;
    }
  };

  const handleCancel = async (appointmentId, reason) => {
    try {
      const updatedAppointment = await cancelAppointment(appointmentId, reason);
      onUpdate(updatedAppointment);
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel appointment');
      throw error;
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={() => setShowRescheduleModal(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={appointment.status === 'Cancelled'}
        >
          Reschedule
        </button>
        <button
          onClick={() => setShowCancelModal(true)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          disabled={appointment.status === 'Cancelled'}
        >
          Cancel
        </button>
      </div>

      {showRescheduleModal && (
        <RescheduleModal
          appointment={appointment}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={handleReschedule}
        />
      )}

      {showCancelModal && (
        <CancelModal
          appointment={appointment}
          onClose={() => setShowCancelModal(false)}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default AppointmentActions;