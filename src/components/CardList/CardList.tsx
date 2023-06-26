import Card from "../Card/Card";
import "./CardList.css";
import React from "react";

/**  */

interface Card {
  word: string;
  team: string;
}

interface CardListProps {
  cards: Card[];
}

function CardList(cards: CardListProps) {
  return (
    <div className="CardList w-1/2 mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {cards &&
          cards.cards.map((card: Card) => (
            <Card key={card.word} team={card.team} word={card.word} />
          ))}
      </div>
    </div>
  );
}

export default CardList;
