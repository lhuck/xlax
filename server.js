const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sessão
app.use(session({
  secret: 'suaSenhaSuperSecreta',
  resave: false,
  saveUninitialized: true
}));

// Página de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Autenticação
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = 'admin';
  const pass = '1234';

  if (username === user && password === pass) {
    req.session.authenticated = true;
    res.redirect('/admin');
  } else {
    res.send('Usuário ou senha inválidos.');
  }
});
app.post('/delete-video', (req, res) => {
  if (!req.session.authenticated) {
    return res.status(403).send('Acesso negado');
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).send('URL é obrigatória para deletar.');
  }

  let videos = JSON.parse(fs.readFileSync('./videos.json'));

  // Remove o vídeo com a URL correspondente
  videos = videos.filter(video => video.url !== url);

  fs.writeFileSync('./videos.json', JSON.stringify(videos, null, 2));

  res.redirect('/admin');
});
// Área protegida
app.get('/admin', (req, res) => {
  if (!req.session.authenticated) {
    return res.redirect('/login');
  }

  const videos = JSON.parse(fs.readFileSync('./videos.json'));
  res.render('admin', { videos }); // <- aqui está a correção
});

app.post('/add-video', (req, res) => {
  if (!req.session.authenticated) {
    return res.status(403).send('Acesso negado');
  }

  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).send('Título e URL são obrigatórios.');
  }

  // Lê os vídeos existentes
  const videos = JSON.parse(fs.readFileSync('./videos.json'));

  // Adiciona o novo no início
  videos.unshift({ title, url });

  // Salva de volta no arquivo
  fs.writeFileSync('./videos.json', JSON.stringify(videos, null, 2));

  // Redireciona de volta pro admin
  res.redirect('/admin');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});

// Página inicial
app.get('/', (req, res) => {
  const videos = JSON.parse(fs.readFileSync('./videos.json'));
  res.render('index', { videos });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
