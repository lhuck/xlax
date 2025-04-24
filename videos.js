// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// serve estáticos
app.use(express.static(path.join(__dirname, 'public')));

// rota home
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// rota que retorna a lista de vídeos
app.get('/api/videos', (req, res) => {
  const videosDir = path.join(__dirname, 'public/assets/videos');
  fs.readdir(videosDir, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    // filtra apenas arquivos .mp4 (pode adicionar outras extensões)
    const vids = files
      .filter(f => /\.(mp4|webm|ogg)$/i.test(f))
      .map(f => ({
        src: `assets/videos/${f}`,
        title: f.replace(/\.(mp4|webm|ogg)$/i, '')
      }));
    res.json(vids);
  });
});

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
