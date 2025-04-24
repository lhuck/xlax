window.addEventListener('DOMContentLoaded', async () => {
  const feed = document.getElementById('feed');

  // busca lista dinâmica de vídeos do servidor
  let videos = [];
  try {
    videos = await fetch('/api/videos').then(res => res.json());
  } catch (e) {
    console.error('Erro ao buscar vídeos:', e);
    return;
  }

  function createVideoCard({ src, title }) {
    const card = document.createElement('div');
    card.className = 'video-card';

    const video = document.createElement('video');
    video.src = src;
    video.controls = true;

    const controls = document.createElement('div');
    controls.className = 'controls';

    // CURTIR
    const likeBtn = document.createElement('button');
    const likedKey = `liked:${src}`;
    const isLiked = localStorage.getItem(likedKey) === 'true';
    likeBtn.textContent = isLiked ? 'Descurtir' : 'Curtir';
    likeBtn.addEventListener('click', () => {
      const cur = localStorage.getItem(likedKey) === 'true';
      localStorage.setItem(likedKey, !cur);
      likeBtn.textContent = cur ? 'Curtir' : 'Descurtir';
    });

    // SALVAR
    const saveBtn = document.createElement('button');
    const savedKey = 'savedVideos';
    let list = JSON.parse(localStorage.getItem(savedKey) || '[]');
    saveBtn.textContent = list.includes(src) ? 'Desalvar' : 'Salvar';
    saveBtn.addEventListener('click', () => {
      list = JSON.parse(localStorage.getItem(savedKey) || '[]');
      if (list.includes(src)) {
        list = list.filter(v => v !== src);
        saveBtn.textContent = 'Salvar';
      } else {
        list.push(src);
        saveBtn.textContent = 'Desalvar';
      }
      localStorage.setItem(savedKey, JSON.stringify(list));
    });

    controls.append(likeBtn, saveBtn);
    card.append(video, controls);
    return card;
  }

  // monta o feed
  videos.forEach(v => feed.appendChild(createVideoCard(v)));
});
