const express = require('express');
const path = require('path');
const fs = require('fs'); // Para ler o arquivo JSON
const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (como vídeos)
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Rota principal para renderizar a página com os vídeos
app.get('/', (req, res) => {
  // Lê os vídeos do arquivo JSON
  fs.readFile(path.join(__dirname, 'videos.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao carregar vídeos');
    }

    // Parse do JSON
    const videos = JSON.parse(data);

    // Renderiza a página com os vídeos passados
    res.render('index', { videos });
  });
});

// Configuração para rodar a aplicação
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
