import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { FaFilePdf } from 'react-icons/fa';

function PrescriptionForm() {
  const [prescription, setPrescription] = useState({
    patientName: '',
    age: '',
    diagnosis: '',
    medications: '',
    instructions: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const element = document.getElementById('prescription');
    const opt = {
      margin: 1,
      filename: `prescription-${prescription.patientName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div id="prescription" className="bg-white p-8 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-center">Medical Prescription</h2>
          <p className="text-center text-gray-600 mt-2">Dr. John Smith, MD</p>
          <p className="text-center text-gray-600">License No: 12345</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={prescription.patientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={prescription.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
          <textarea
            name="diagnosis"
            value={prescription.diagnosis}
            onChange={handleChange}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Medications</label>
          <textarea
            name="medications"
            value={prescription.medications}
            onChange={handleChange}
            rows="4"
            placeholder="1. Medicine Name - Dosage - Duration&#10;2. Medicine Name - Dosage - Duration"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={prescription.instructions}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        <FaFilePdf className="text-xl" />
        <span>Generate PDF</span>
      </button>
    </div>
  );
}

export default PrescriptionForm;