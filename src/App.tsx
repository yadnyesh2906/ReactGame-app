import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { FaHome, FaGamepad, FaBook, FaCloud, FaStore, FaUser } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import GameDetail from "./GameDetail";
import "./App.css";

const gamesData = [
  { id: 1, title: "GTA V", text: "Open world action adventure", image: "/images/GTA.jpg" },
  { id: 2, title: "NFS", text: "High speed racing game", image: "/images/NFS.jpg" },
  { id: 3, title: "PUBG", text: "Online battle royale", image: "/images/pubg.jpg" },
  { id: 4, title: "COD", text: "Action shooting game", image: "/images/COD.jpg" },
  { id: 5, title: "FIFA", text: "Football sports game", image: "/images/FIFA.jpg" },
  { id: 6, title: "Minecraft", text: "Creative sandbox game", image: "/images/MINECRAFT.jpg" },
  { id: 7, title: "Fortnite", text: "Battle royale shooter", image: "/images/FORTNITE.jpg" },
  { id: 8, title: "Apex", text: "Fast-paced shooter", image: "/images/APEX.jpg" },
  { id: 9, title: "Mario Kart", text: "Fun racing game", image: "/images/MARIO.jpg" },
];

function Sidebar({ recentGames }: { recentGames: typeof gamesData }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="user-heading"><FaUser style={{ marginRight: "8px" }} /> User details</h2>
      <ul className="list-group">
        <li className="list-group-item" onClick={() => navigate("/")}>
          <FaHome style={{ marginRight: "8px" }} /> Home
        </li>
        <li className="list-group-item" onClick={() => navigate("/gamepass")}>
          <FaGamepad style={{ marginRight: "8px" }} /> Game Pass
        </li>
        <li className="list-group-item" onClick={() => navigate("/library")}>
          <FaBook style={{ marginRight: "8px" }} /> My Library
        </li>
        <li className="list-group-item" onClick={() => navigate("/cloud")}>
          <FaCloud style={{ marginRight: "8px" }} /> Cloud Gaming
        </li>
        <li className="list-group-item" onClick={() => navigate("/store")}>
          <FaStore style={{ marginRight: "8px" }} /> Store
        </li>
        {/* Most Recent Section */}
        <li className="list-label"><MdAccessTime style={{ marginRight: "8px" }} /> Most Recent</li>
        <div className="recent-games-container">
          {recentGames.slice(0, 2).map(game => (
            <div className="recent-game-card" key={game.id}>
              <img src={game.image} alt={game.title} />
              <span>{game.title}</span>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

// Home page with search bar
function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentGames, setRecentGames] = useState<typeof gamesData>([]);

  const handleGameClick = (game: typeof gamesData[0]) => {
    setRecentGames(prev => {
      const updated = [game, ...prev.filter(g => g.id !== game.id)];
      return updated.slice(0, 5);
    });
  };

  const handlePlayClick = (game: typeof gamesData[0]) => {
    navigate(`/game/${game.id}`);
  };

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Sidebar recentGames={recentGames} />

      <div className="cards-panel">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="cards-grid-container">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card" onClick={() => handleGameClick(game)}>
              <img src={game.image} alt={game.title} />
              <h5>{game.title}</h5>
              <p>{game.text}</p>
              <button className="play-btn" onClick={(e) => { e.stopPropagation(); handlePlayClick(game); }}>Play</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Other tabs without search bar
function TabPage({ gamesSubset }: { gamesSubset: typeof gamesData }) {
  const navigate = useNavigate();
  const [recentGames, setRecentGames] = useState<typeof gamesData>([]);

  const handleGameClick = (game: typeof gamesData[0]) => {
    setRecentGames(prev => {
      const updated = [game, ...prev.filter(g => g.id !== game.id)];
      return updated.slice(0, 5);
    });
  };

  const handlePlayClick = (game: typeof gamesData[0]) => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="app-container">
      <Sidebar recentGames={recentGames} />
      <div className="cards-panel">
        <div className="cards-grid-container">
          {gamesSubset.map(game => (
            <div key={game.id} className="game-card" onClick={() => handleGameClick(game)}>
              <img src={game.image} alt={game.title} />
              <h5>{game.title}</h5>
              <p>{game.text}</p>
              <button className="play-btn" onClick={(e) => { e.stopPropagation(); handlePlayClick(game); }}>Play</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamepass" element={<TabPage gamesSubset={gamesData.slice(0, 2)} />} />
        <Route path="/library" element={<TabPage gamesSubset={gamesData.slice(2, 4)} />} />
        <Route path="/cloud" element={<TabPage gamesSubset={gamesData.slice(4, 6)} />} />
        <Route path="/store" element={<TabPage gamesSubset={gamesData.slice(6, 9)} />} />
        <Route path="/game/:id" element={<GameDetail gamesData={gamesData} />} />
      </Routes>
    </Router>
  );
}
