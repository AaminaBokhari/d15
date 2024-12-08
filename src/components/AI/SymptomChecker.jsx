import React, { useState, useEffect } from 'react';
import AISymptomChecker from '../../utils/aiService';

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const symptoms = [
    'fever', 'cough', 'fatigue', 'difficulty_breathing',
    'body_aches', 'headache', 'loss_of_taste_smell',
    'sore_throat', 'runny_nose', 'nausea'
  ];

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    try {
      const results = await AISymptomChecker.analyzeSymptoms(selectedSymptoms);
      setAnalysis(results);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI Symptom Checker</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select Symptoms</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {symptoms.map(symptom => (
            <button
              key={symptom}
              onClick={() => handleSymptomToggle(symptom)}
              className={`p-2 rounded-lg text-sm ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {symptom.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={analyzeSymptoms}
        disabled={selectedSymptoms.length === 0 || isAnalyzing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>

      {analysis.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
          <div className="space-y-2">
            {analysis.map(({ condition, probability }) => (
              <div
                key={condition}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{condition}</span>
                <span className="text-sm text-gray-600">
                  {(probability * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;