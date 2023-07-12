import React from "react";
import { StartGameProps } from "../../types/types";

/** StartGame component.
 *
 * This component is a button that starts the game.
 *
 * Props:
 * - startGame: a function
 *
 * State:
 * - None
 *
 * App -> GameContainer -> StartGame
 */

function StartGame({ startGame }: StartGameProps) {
  return (
    <button
      onClick={startGame}
      className="btn btn-primary align-center"
      style={{ borderRadius: "4px", padding: "10px 20px", margin: "10px" }}
    >
      Start Game
    </button>
  );
}

export default StartGame;
