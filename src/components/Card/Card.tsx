import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CardProps } from "../../types/types";

/**
 * Card component.
 * Represents an individual codename card.
 * Receives props such as the codename, revealed status, and any additional information.
 * Handles user interactions, such as card selection.
 */

function Card(props: CardProps) {
  const { word, team } = props;
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = (): void => {
    if (!selected) {
      setSelected(true);
      props.handleGuess(word, team);
    }
  };

  return (
    <div className={`Card ${selected ? "selected" : ""}`}>
      <Button variant={team} disabled={selected} onClick={handleClick}>
        {word.toUpperCase()}
      </Button>
    </div>
  );
}

export default Card;
