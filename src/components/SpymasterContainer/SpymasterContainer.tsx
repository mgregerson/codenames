import React from "react";

import { SpymasterContainerProps } from "../../types/types";
import SpymasterBoard from "./SpymasterBoard/SpyMasterBoard";

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
  const { player, cards } = props;

  return (
    <div className="SpymasterContainer pt-5">
      {player.role === "spymaster" && cards && <SpymasterBoard cards={cards} />}
    </div>
  );
}

export default SpymasterContainer;
