const { Painting } = require('../models');

const PaintingController = {
    // Get all paintings
    async getAllPaintings(req, res) {
        try {
            const paintings = await Painting.findAll();
            res.json(paintings);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching paintings' });
        }
    },

    // Get a single painting by ID
    async getPaintingById(req, res) {
        try {
            const painting = await Painting.findByPk(req.params.id);
            if (!painting) return res.status(404).json({ error: 'Painting not found' });
            res.json(painting);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching painting' });
        }
    },

    // Create a new painting
    async createPainting(req, res) {
        try {
            const { title, description, price, imageUrl } = req.body;
            const painting = await Painting.create({ title, description, price, imageUrl });
            res.status(201).json(painting);
        } catch (error) {
            res.status(500).json({ error: 'Error creating painting' });
        }
    },

    // Update a painting by ID
    async updatePainting(req, res) {
        try {
            const { title, description, price, imageUrl } = req.body;
            const painting = await Painting.findByPk(req.params.id);
            if (!painting) return res.status(404).json({ error: 'Painting not found' });

            await painting.update({ title, description, price, imageUrl });
            res.json(painting);
        } catch (error) {
            res.status(500).json({ error: 'Error updating painting' });
        }
    },

    // Delete a painting by ID
    async deletePainting(req, res) {
        try {
            const painting = await Painting.findByPk(req.params.id);
            if (!painting) return res.status(404).json({ error: 'Painting not found' });

            await painting.destroy();
            res.json({ message: 'Painting deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting painting' });
        }
    },
};

module.exports = PaintingController;
