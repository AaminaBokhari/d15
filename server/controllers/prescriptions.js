import Prescription from '../models/Prescription.js';

export const createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      doctor: req.user.id
    });

    await prescription.populate(['patient', 'doctor']);

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const query = req.user.role === 'doctor'
      ? { doctor: req.user.id }
      : { patient: req.user.id };

    const prescriptions = await Prescription.find(query)
      .populate(['patient', 'doctor'])
      .sort({ date: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate(['patient', 'doctor']);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescription', error: error.message });
  }
};