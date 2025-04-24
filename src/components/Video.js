const { useState } = React;

function Video({ src, title }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);

  return (
    <div>
      <h2>{title}</h2>
      <video controls>
        <source src={src} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <div>
        <button onClick={handleLike}>{liked ? "Descurtir" : "Curtir"}</button>
        <button onClick={handleSave}>{saved ? "Desalvar" : "Salvar"}</button>
      </div>
    </div>
  );
}

// Exemplo de uso:
const App = () => (
  <div>
    <Video src="http://localhost:3000/assets/videos/video1.mp4" title="Vídeo 1" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
