import React from "react";
import "./CardList.css";

import Card from "./Card";

import { CardListProps, CardType } from "../../../types/types";

/** CardList Component
 *
 * This component is a 5 x 5 grid of cards on the gameboard.
 *
 * Props:
 * - cards: an array of objects
 * - currTeam: a string
 * - player: an object
 *
 * State:
 * - None
 *
 * App -> GameContainer -> CardList
 */

function CardList(props: CardListProps) {
  return (
    <div className="CardList mt-4">
      <div className="grid grid-cols-5">
        {props.cards &&
          props.cards.map((card: CardType) => (
            <div
              key={card.word}
              className="flex justify-center items-center p-1 "
            >
              <Card
                team={card.team}
                word={card.word}
                guess={card.guess}
                currTeam={props.currTeam}
                player={props.player}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardList;
