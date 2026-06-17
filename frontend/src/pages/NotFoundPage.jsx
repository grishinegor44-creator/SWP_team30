import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена.</p>
      <p>Возможно, ссылка неверная или страница была удалена.</p>

      <Link to="/games">Бегом к играм!</Link>
    </div>
  );
}

export default NotFoundPage;
