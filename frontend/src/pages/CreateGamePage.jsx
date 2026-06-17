import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createGame } from "../api/api";

function CreateGamePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleBannerChange(event) {
    const file = event.target.files[0];
    setBannerFile(file || null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      await createGame(formData);
      navigate("/games");
    } catch (err) {
      setError(err.message || "Не удалось создать игру(слава Богу...)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link to="/games">← Назад в каталог</Link>

      <h1>Создать игру</h1>

      {error ? <p>Ошибка: {error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Название</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Название игры"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Описание игры"
            rows="6"
          />
        </div>

        <div>
          <label htmlFor="banner">Баннер</label>
          <input
            id="banner"
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
          />
        </div>

        {bannerFile ? <p>Выбран файл: {bannerFile.name}</p> : null}

        <button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать игру"}
        </button>
      </form>
    </div>
  );
}

export default CreateGamePage;
