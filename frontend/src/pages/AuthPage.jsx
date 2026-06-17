import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLoginMode = mode === "login";

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (isLoginMode) {
        await login({ username, password });
      } else {
        await register({ username, email, password });
      }

      navigate("/games");
    } catch (err) {
      setError(err.message || "Не удалось выполнить авторизацию");
    } finally {
      setLoading(false);
    }
  }

  function switchToLogin() {
    setMode("login");
    setError("");
    setPassword("");
  }

  function switchToRegister() {
    setMode("register");
    setError("");
    setPassword("");
  }

  return (
    <div>
      <h1>{isLoginMode ? "Вход" : "Регистрация"}</h1>

      <div>
        <button type="button" onClick={switchToLogin} disabled={isLoginMode}>
          Вход
        </button>
        <button
          type="button"
          onClick={switchToRegister}
          disabled={!isLoginMode}
        >
          Регистрация
        </button>
      </div>

      {error ? <p>Ошибка: {error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        {!isLoginMode ? (
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? isLoginMode
              ? "Вход..."
              : "Регистрация..."
            : isLoginMode
              ? "Войти"
              : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
