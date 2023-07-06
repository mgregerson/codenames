import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CardProps } from "../../../../types/types";
import { useContext } from "react";
import { SocketContext } from "../../../../context/socketContext";

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

  return (
    <div className={`Card ${selectedCard ? "selected" : ""}`}>
      <Button variant={team} disabled={checkDisabled()} onClick={handleClick}>
        {word.toUpperCase()}
      </Button>
    </div>
  );
}

export default Card;
