const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Read learning items from JSON file
const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/items.json'), 'utf8'));

// Routes
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

app.get('/api/items/:id/image', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.sendFile(path.join(__dirname, '..', item.image));
});

app.get('/api/items/:id/sound', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.sendFile(path.join(__dirname, '..', item.sound));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 