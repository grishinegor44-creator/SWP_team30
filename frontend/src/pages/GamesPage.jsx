import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../api/api";
import GameCard from "../components/GameCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

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
    return <Loader text="Загрузка игр..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (games.length === 0) {
    return (
      <div>
        <h1>Каталог игр</h1>
        <EmptyState message="Пока нет ни одной игры." />
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
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
