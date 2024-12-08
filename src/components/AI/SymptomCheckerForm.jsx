import React, { useState } from 'react';
import AISymptomChecker from '../../utils/aiService';
import SymptomCheckerResults from './SymptomCheckerResults';
import { FaSpinner } from 'react-icons/fa';

function SymptomCheckerForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const symptoms = [
    { id: 'fever', label: 'Fever', icon: '🌡️' },
    { id: 'cough', label: 'Cough', icon: '😷' },
    { id: 'fatigue', label: 'Fatigue', icon: '😴' },
    { id: 'difficulty_breathing', label: 'Difficulty Breathing', icon: '🫁' },
    { id: 'body_aches', label: 'Body Aches', icon: '🤕' },
    { id: 'headache', label: 'Headache', icon: '🤯' },
    { id: 'loss_of_taste_smell', label: 'Loss of Taste/Smell', icon: '👃' },
    { id: 'sore_throat', label: 'Sore Throat', icon: '🗣️' },
    { id: 'runny_nose', label: 'Runny Nose', icon: '🤧' },
    { id: 'nausea', label: 'Nausea', icon: '🤢' }
  ];

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
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
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Select Your Symptoms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {symptoms.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleSymptomToggle(id)}
              className={`flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                selectedSymptoms.includes(id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze Symptoms</span>
          )}
        </button>

        {analysis.length > 0 && (
          <div className="mt-6">
            <SymptomCheckerResults results={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomCheckerForm;