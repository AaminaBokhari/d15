import MedicalHistory from '../models/MedicalHistory.js';

export const createMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.create({
      ...req.body,
      doctor: req.user.id
    });

    await medicalHistory.populate(['patient', 'doctor', 'prescription']);

    res.status(201).json(medicalHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating medical history', error: error.message });
  }
};

export const getMedicalHistory = async (req, res) => {
  try {
    const query = req.user.role === 'doctor'
      ? { doctor: req.user.id }
      : { patient: req.user.id };

    const medicalHistory = await MedicalHistory.find(query)
      .populate(['patient', 'doctor', 'prescription'])
      .sort({ date: -1 });

    res.json(medicalHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical history', error: error.message });
  }
};

export const getPatientMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.find({ patient: req.params.patientId })
      .populate(['patient', 'doctor', 'prescription'])
      .sort({ date: -1 });

    res.json(medicalHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient medical history', error: error.message });
  }
};