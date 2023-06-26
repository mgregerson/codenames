import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Card component.
 * Represents an individual codename card.
 * Receives props such as the codename, revealed status, and any additional information.
 * Handles user interactions, such as card selection.
 */

interface CardProps {
  word: string;
  team: string;
}

function Card(props: CardProps) {
  const { word, team } = props;
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = (): void => {
    if (!selected) {
      setSelected(true);
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
