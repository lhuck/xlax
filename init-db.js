// init-db.js
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
  // Tabela de vídeos
  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      src TEXT NOT NULL,
      title TEXT NOT NULL
    )
  `);

  // Tabela de curtidas
  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      video_id INTEGER,
      PRIMARY KEY(video_id),
      FOREIGN KEY(video_id) REFERENCES videos(id)
    )
  `);

  // Tabela de salvamentos
  db.run(`
    CREATE TABLE IF NOT EXISTS saves (
      video_id INTEGER,
      PRIMARY KEY(video_id),
      FOREIGN KEY(video_id) REFERENCES videos(id)
    )
  `);
// após as criações de tabelas...
const stmt = db.prepare("INSERT OR IGNORE INTO videos (id, src, title) VALUES (?, ?, ?)");
const lista = [
  [1, 'assets/videos/video1.mp4', 'Vídeo 1'],
  // adicione mais: [2, 'assets/videos/video2.mp4', 'Vídeo 2'], ...
];
lista.forEach(v => stmt.run(v[0], v[1], v[2]));
stmt.finalize();

  console.log('Banco inicializado com sucesso!');
});

db.close();
