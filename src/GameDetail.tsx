import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

interface Game {
  id: number;
  title: string;
  text: string;
  image: string;
}

interface Props {
  gamesData: Game[];
}

export default function GameDetail({ gamesData }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = gamesData.find(g => g.id === Number(id));

  if (!game) return <p>Game not found!</p>;

  return (
    <div className="game-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="game-detail-card">
        <img src={game.image} alt={game.title} />
        <h2>{game.title}</h2>
        <p>{game.text}</p>
        <div className="modal-buttons">
          <button className="buy-btn">Buy</button>
          <button className="rent-btn">Rent</button>
        </div>
      </div>
    </div>
  );
}
