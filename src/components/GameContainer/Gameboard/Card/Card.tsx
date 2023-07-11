import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CardProps } from "../../../../types/types";
import { useContext } from "react";
import { SocketContext } from "../../../../context/socketContext";

import redGuess from "../../../../styles/redGuess.png";
import blueGuess from "../../../../styles/blueGuess.png";
import neutralGuess from "../../../../styles/neutralGuess.png";
import deathGuess from "../../../../styles/deathGuess.png";

/**
 * Card component.
 * Represents an individual codename card.
 * Receives props such as the codename, revealed status, and any additional information.
 * Handles user interactions, such as card selection.
 */

function Card(props: CardProps) {
  const { word, team, currTeam, player } = props;
  const [selectedCard, setSelectedCard] = React.useState<boolean>(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Handle making a guess
    socket.on("updateSelected", (chosenWord: any) => {
      if (chosenWord.word === word) {
        setSelectedCard(true);
      }
    });
  }, [socket, word]);

  function checkDisabled(): boolean {
    // if the card has already been chosen, disable for all
    if (selectedCard) {
      return true;
      // if the player is a spymaster, disable
    } else if (player.role === "spymaster") {
      return true;
    } else if (player.team !== currTeam) {
      // if the player is not on the current team, disable
      return true;
    }
    return false;
  }

  const handleClick = (): void => {
    if (!selectedCard) {
      socket.emit("makeGuess", word, currTeam);
      setSelectedCard(true);
    }
  };

  let imageOverlay = null;

  switch (team) {
    case "red":
      imageOverlay = redGuess;
      break;
    case "blue":
      imageOverlay = blueGuess;
      break;
    case "neutral":
      imageOverlay = neutralGuess;
      break;
    case "death":
      imageOverlay = deathGuess;
      break;
    default:
      break;
  }

  return (
    <div
      className={`Card relative ${
        selectedCard ? "selected" : ""
      } display: flex items-center justify-center w-36 h-24 m-1 rounded-md border-1
      bg-[url('neutralCard.png')] bg-cover bg-no-repeat
    `}
    >
      {selectedCard && imageOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `url(${imageOverlay})`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
      <Button
        className={`w-full h-full border-none text-sm font-bold text-black uppercase cursor-pointer flex items-center justify-center ${
          selectedCard ? "invisible" : ""
        }`}
        variant={team}
        disabled={checkDisabled()}
        onClick={handleClick}
      >
        <div
          className={`${word} text-center mt-[38px] font-bold flex items-center justify-center`}
        >
          {word.toUpperCase()}
        </div>
      </Button>
    </div>
  );
}

export default Card;
