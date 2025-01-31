const express = require('express');
const router = express.Router();
const PaintingController = require('../controllers/PaintingController');

// Define painting routes
router.get('/', PaintingController.getAllPaintings);
router.get('/:id', PaintingController.getPaintingById);
router.post('/', PaintingController.createPainting);
router.put('/:id', PaintingController.updatePainting);
router.delete('/:id', PaintingController.deletePainting);

module.exports = router;
