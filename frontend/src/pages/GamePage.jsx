import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteGame, getGameById, updateGame } from "../api/api";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadGame() {
      try {
        setLoading(true);
        setError("");

        const data = await getGameById(id);
        setGame(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (err) {
        setError(err.message || "Не удалось загрузить игру");
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm("Уверен? Не так уж все плохо.");

    if (!confirmed) {
      return;
    }

    try {
      await deleteGame(id);
      navigate("/games");
    } catch (err) {
      setError(err.message || "Не удалось удалить игру(к сожалению)");
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();

    try {
      setError("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      const updatedGame = await updateGame(id, formData);

      setGame(updatedGame);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Не удалось обновить игру");
    }
  }

  if (loading) {
    return <div>Загрузка игры...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Ошибка: {error}</p>
        <Link to="/games">Вернуться в каталог</Link>
      </div>
    );
  }

  if (!game) {
    return (
      <div>
        <p>Игра не найдена.</p>
        <Link to="/games">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/games">← В каталог</Link>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <h1>Редактирование</h1>

          <div>
            <label htmlFor="title">Название</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="6"
            />
          </div>

          <button type="submit">Сохранить</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            {"\\u00D7"}
          </button>
        </form>
      ) : (
        <div>
          <h1>{game.title}</h1>

          {game.bannerUrl ? (
            <img
              src={game.bannerUrl}
              alt={game.title}
              style={{ width: "320px", borderRadius: "8px" }}
            />
          ) : null}

          <p>{game.description || "Описание пока отсутствует."}</p>

          <div>
            <button type="button" onClick={() => setIsEditing(true)}>
              Редактировать
            </button>

            <button type="button" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
