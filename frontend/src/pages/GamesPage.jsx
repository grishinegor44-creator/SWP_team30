import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../api/api";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        setLoading(true);
        setError("");

        const data = await getGames();
        setGames(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Не удалось загрузить игры");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  if (loading) {
    return <div>Загрузка игр...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (games.length === 0) {
    return (
      <div>
        <h1>Каталог игр</h1>
        <p>Пока нет ни одной игры.</p>
        <Link to="/games/create">Создать первую игру</Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Каталог игр</h1>
        <Link to="/games/create">Создать игру</Link>
      </div>
      <div>
        {games.map((game) => (
          <div key={game.id}>
            <h2>{game.title}</h2>

            <p>{game.description || "Описание пока отсутствует."}</p>

            {game.bannerUrl ? (
              <img
                src={game.bannerUrl}
                alt={game.title}
                style={{ width: "240px", borderRadius: "8px" }}
              />
            ) : null}

            <div>
              <Link to={`/games/${game.id}`}>Открыть страницу игры</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
