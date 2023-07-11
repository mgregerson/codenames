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
  console.log(players, "winning team and players in displayWinner");
  return (
    <main
      className="flex justify-center items-center flex-col"
      style={{ opacity: 1, transform: "none" }}
    >
      <section className="bg-white rounded-xl px-4 pb-2 py-2 dark:bg-[#222222] dark:text-dark-text">
        <h1 className="text-lg font-bold text-center landscape:text-2xl">
          {winningTeam} wins!
        </h1>
        <p className="text-md text-center landscape:text-lg">
          {players.map((player, index) => (
            <span key={index}>{player.name} </span>
          ))}
        </p>
      </section>
    </main>
  );
}
