const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE_PATH = './words.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML/CSS/JS/images

app.get('/api/words', (req, res) => {
  try {
    const words = JSON.parse(fs.readFileSync(FILE_PATH));
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read word list' });
  }
});

app.post('/api/words', (req, res) => {
  const word = req.body.word?.trim().toLowerCase();
  if (!word) return res.status(400).json({ error: 'Invalid word' });

  try {
    const words = JSON.parse(fs.readFileSync(FILE_PATH));
    if (!words.includes(word)) {
      words.push(word);
      fs.writeFileSync(FILE_PATH, JSON.stringify(words, null, 2));
    }
    res.status(201).json({ success: true, word });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write word' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
