import mongoose from 'mongoose';

const medicalDocumentSchema = new mongoose.Schema({
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
  documentType: {
    type: String,
    enum: ['Lab Report', 'X-Ray', 'Prescription', 'Other'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryId: String,
  notes: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('MedicalDocument', medicalDocumentSchema);