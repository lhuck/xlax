const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const videos = require('./videos.json');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { videos });
});

// Rota de API
app.get('/api/videos', (req, res) => {
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
