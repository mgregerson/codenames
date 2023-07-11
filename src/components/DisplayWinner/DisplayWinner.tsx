import React from "react";
import { DisplayWinnerProps } from "../../types/types";

/**
 * DisplayWinner
 *
 * Displays the team that won the game, as well as all the
 * players that were on the winning team.
 *
 * Props: winningTeam, players
 */

export default function DisplayWinner({
  winningTeam,
  players,
}: DisplayWinnerProps): JSX.Element {
  return (
    <main
      className="flex justify-center items-center flex-col"
      style={{ opacity: 1, transform: "none" }}
    >
      <section
        className="bg-gray-300 rounded-xl shadow-lg border-2 border-gray-300 border-solid px-4 pb-2 dark:bg-[#222222] dark:text-dark-text"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h1 className="text-lg text-red-dark font-bold text-center landscape:text-2xl">
          {`${winningTeam.toUpperCase()} wins!`}
        </h1>
        <p className="text-md text-red-dark text text-center landscape:text-lg">
          {players.map((player, index) => (
            <span key={index}>{player.name} </span>
          ))}
        </p>
      </section>
    </main>
  );
}
