import express from 'express';
import scrapeLOLData from './scrapegeneral.js'; // Ensure the correct file name

const app = express();
const port = 3000;

app.get('/api/lol-games', async (req, res) => {
    try {
        const data = await scrapeLOLData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});