import React from "react";

function EmptyState({ message = "Здесь пока пусто..." }) {
  return <div>{message}</div>;
}

export default EmptyState;
