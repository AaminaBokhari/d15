import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function SymptomCheckerResults({ results }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Analysis Results</h3>
      <div className="space-y-3">
        {results.map(({ condition, probability }) => (
          <div
            key={condition}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  probability > 0.7 ? 'bg-red-500' :
                  probability > 0.4 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
              />
              <span className="font-medium">{condition}</span>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    probability > 0.7 ? 'bg-red-500' :
                    probability > 0.4 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${probability * 100}%` }}
                />
              </div>
              <span className="ml-3 text-sm text-gray-600">
                {(probability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 text-sm text-yellow-800 bg-yellow-50 p-4 rounded-lg mt-4">
        <FaExclamationTriangle className="flex-shrink-0" />
        <p>These results are for informational purposes only. Please consult with a healthcare professional for proper medical advice.</p>
      </div>
    </div>
  );
}

export default SymptomCheckerResults;