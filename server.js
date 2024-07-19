const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const memorySchema = new mongoose.Schema({
    image: String,
    text: String
});

const Memory = mongoose.model('Memory', memorySchema);

app.use(cors());
app.use(bodyParser.json());

// Route to get all memories
app.get('/memories', async (req, res) => {
    const memories = await Memory.find();
    res.json(memories);
});

// Route to add a new memory
app.post('/memories', async (req, res) => {
    const newMemory = new Memory(req.body);
    await newMemory.save();
    res.json(newMemory);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
