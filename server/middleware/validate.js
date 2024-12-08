import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const appointmentValidation = [
  body('dateTime').isISO8601().withMessage('Invalid date format'),
  body('type').isIn(['Check-up', 'Follow-up', 'Consultation']).withMessage('Invalid appointment type'),
  body('patient').isMongoId().withMessage('Invalid patient ID'),
  body('doctor').isMongoId().withMessage('Invalid doctor ID'),
];

export const prescriptionValidation = [
  body('patient').isMongoId().withMessage('Invalid patient ID'),
  body('doctor').isMongoId().withMessage('Invalid doctor ID'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('medications').isArray().withMessage('Medications must be an array'),
  body('medications.*.name').notEmpty().withMessage('Medication name is required'),
  body('medications.*.dosage').notEmpty().withMessage('Medication dosage is required'),
];

export const messageValidation = [
  body('recipient').isMongoId().withMessage('Invalid recipient ID'),
  body('content').notEmpty().withMessage('Message content is required'),
];