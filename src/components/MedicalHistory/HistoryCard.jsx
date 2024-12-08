import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { FaFileMedical, FaFlask, FaHeartbeat } from 'react-icons/fa';

function HistoryCard({ record }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPP');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Visit Date: {formatDate(record.date)}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          Record #{record._id.slice(-4)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <FaFileMedical className="text-blue-500" />
            <h4 className="font-medium text-gray-700">Diagnosis</h4>
          </div>
          <p className="text-gray-600">{record.diagnosis}</p>
        </div>

        {record.prescription && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FaFileMedical className="text-green-500" />
              <h4 className="font-medium text-gray-700">Prescription</h4>
            </div>
            <p className="text-gray-600">{record.prescription}</p>
          </div>
        )}

        {record.labResults?.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FaFlask className="text-purple-500" />
              <h4 className="font-medium text-gray-700">Lab Results</h4>
            </div>
            <div className="space-y-2">
              {record.labResults.map((lab, index) => (
                <div key={index} className="text-gray-600">
                  <span className="font-medium">{lab.testName}:</span> {lab.result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {record.vitals && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2 mb-2">
            <FaHeartbeat className="text-red-500" />
            <h4 className="font-medium text-gray-700">Vitals</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-600">
              <span className="font-medium">BP:</span> {record.vitals.bloodPressure}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Temp:</span> {record.vitals.temperature}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">HR:</span> {record.vitals.heartRate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

HistoryCard.propTypes = {
  record: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
    prescription: PropTypes.string,
    labResults: PropTypes.arrayOf(PropTypes.shape({
      testName: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })),
    vitals: PropTypes.shape({
      bloodPressure: PropTypes.string,
      temperature: PropTypes.string,
      heartRate: PropTypes.string
    })
  }).isRequired
};

export default HistoryCard;