import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 4000;

app.use(express.json());

const {
    DB_HOST = 'localhost',
    DB_USER = 'admin',
    DB_PASS = 'secret',
    DB_NAME = 'bossdb'
} = process.env;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`)
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));

const Item = mongoose.model('Item', { name: String });

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.status(201).json(item);
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error("❌ Erreur suppression :", err);
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Backend lancé sur http://localhost:${port}`);
});
