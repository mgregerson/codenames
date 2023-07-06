import React from "react";

interface StartGameProps {
  startGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function StartGame({ startGame }: StartGameProps) {
  return (
    <button
      onClick={startGame}
      className="btn btn-primary"
      style={{ borderRadius: "4px", padding: "10px 20px", margin: "10px" }}
    >
      Start Game
    </button>
  );
}

export default StartGame;
