import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CardProps } from "../../types/types";
import { useContext } from "react";
import { SocketContext } from "../../context/socketContext";

/**
 * Card component.
 * Represents an individual codename card.
 * Receives props such as the codename, revealed status, and any additional information.
 * Handles user interactions, such as card selection.
 */

function Card(props: CardProps) {
  const { word, team, currTeam } = props;
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

  const handleClick = (): void => {
    if (!selectedCard) {
      socket.emit("makeGuess", word, currTeam);
      setSelectedCard(true);
    }
  };

  return (
    <div className={`Card ${selectedCard ? "selected" : ""}`}>
      <Button variant={team} disabled={selectedCard} onClick={handleClick}>
        {word.toUpperCase()}
      </Button>
    </div>
  );
}

export default Card;
