import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  labResults: [{
    testName: String,
    result: String,
    date: Date
  }],
  vitals: {
    bloodPressure: String,
    temperature: String,
    heartRate: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('MedicalHistory', medicalHistorySchema);