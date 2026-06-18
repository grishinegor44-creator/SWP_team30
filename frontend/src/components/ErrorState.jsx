import React from "react";

function ErrorState({ message = "Что-то пошло не так..." }) {
  return <div>Ошибка: {message}</div>;
}

export default ErrorState;
