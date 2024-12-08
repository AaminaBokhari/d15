import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadMedicalDocument } from '../utils/fileUpload.js';
import {
  uploadDocument,
  getDocuments,
  deleteDocument
} from '../controllers/documentController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(uploadMedicalDocument, uploadDocument)
  .get(getDocuments);

router.route('/:id')
  .delete(deleteDocument);

export default router;