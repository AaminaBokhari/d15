import React from 'react';
import PrescriptionForm from '../components/Prescription/PrescriptionForm';

function Prescriptions() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Prescriptions</h1>
      <PrescriptionForm />
    </div>
  );
}

export default Prescriptions;