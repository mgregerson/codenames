import React, { useContext } from "react";

import { SocketContext } from "../../context/socketContext";
import { SpymasterContainerProps } from "../../types/types";
import SpymasterBoard from "./SpymasterBoard/SpyMasterBoard";
import ProvideClue from "./ProvideClue/ProvideClue";

/**
 *
 * @param props
 * currTeam: string
 * player: PlayerType
 * cards: CardType[]
 *
 * @returns
 */

function SpymasterContainer(props: SpymasterContainerProps) {
  const socket = useContext(SocketContext);
  const { currTeam, player, cards } = props;

  function emitClue(clueData: { clue: string; numGuesses: number }): void {
    socket.emit("emitClue", clueData);
  }

  return (
    <div className="SpymasterContainer pt-5">
      {player.role === "spymaster" && currTeam === player.team && (
        <ProvideClue emitClue={emitClue} />
      )}
      {player.role === "spymaster" && cards && <SpymasterBoard cards={cards} />}
    </div>
  );
}

export default SpymasterContainer;
