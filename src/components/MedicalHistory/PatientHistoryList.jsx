import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import HistoryCard from './HistoryCard';
import LoadingSpinner from '../common/LoadingSpinner';

function PatientHistoryList({ history, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error loading medical history: {error.message}</p>
      </div>
    );
  }

  if (!history?.length) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-600">No medical history records found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((record) => (
        <HistoryCard key={record._id} record={record} />
      ))}
    </div>
  );
}

PatientHistoryList.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
    prescription: PropTypes.string,
    labResults: PropTypes.arrayOf(PropTypes.shape({
      testName: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      date: PropTypes.string
    })),
    vitals: PropTypes.shape({
      bloodPressure: PropTypes.string,
      temperature: PropTypes.string,
      heartRate: PropTypes.string
    })
  })),
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

export default PatientHistoryList;