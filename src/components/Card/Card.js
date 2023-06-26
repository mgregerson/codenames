import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Card component.
 * Represents an individual codename card.
 * Receives props such as the codename, revealed status, and any additional information.
 * Handles user interactions, such as card selection.
 */

function Card(props) {
  const { word, team } = props;
  console.log(team, "TEAM in CARD");
  const [selected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!selected);
  };

  return (
    <div className={`Card ${selected ? "selected" : ""}`}>
      <Button variant={team}>{word.toUpperCase()}</Button>
    </div>
  );
}

export default Card;
