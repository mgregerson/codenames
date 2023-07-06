import Card from "../Card/Card";
import "./CardList.css";
import React from "react";
import { CardListProps, CardType } from "../../types/types";

function CardList(props: CardListProps) {
  return (
    <div className="CardList w-1/2 mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {props.cards &&
          props.cards.map((card: CardType) => (
            <Card
              key={card.word}
              team={card.team}
              word={card.word}
              guess={card.guess}
              currTeam={props.currTeam}
              player={props.player}
            />
          ))}
      </div>
    </div>
  );
}

export default CardList;
