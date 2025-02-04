const express = require('express');
const router = express.Router();
const PaintingController = require('../controllers/PaintingController');
const { authenticateUser, isSuperuser } = require('../middleware/authMiddleware');

// Define painting routes
router.get('/', PaintingController.getAllPaintings);
router.get('/:id', PaintingController.getPaintingById);
router.post('/', authenticateUser , isSuperuser , PaintingController.createPainting);
router.put('/:id',authenticateUser,isSuperuser, PaintingController.updatePainting);
router.delete('/:id',authenticateUser,isSuperuser ,PaintingController.deletePainting);

module.exports = router;
