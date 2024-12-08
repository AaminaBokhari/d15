import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genericName: String,
  category: {
    type: String,
    required: true
  },
  dosageForm: {
    type: String,
    required: true
  },
  strength: String,
  manufacturer: String,
  description: String,
  sideEffects: [String],
  contraindications: [String],
  interactions: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add text indexes for search
medicationSchema.index({
  name: 'text',
  genericName: 'text',
  category: 'text'
});

export default mongoose.model('Medication', medicationSchema);