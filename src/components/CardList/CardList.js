import Card from "../Card/Card";
import "./CardList.css";

/**  */

function CardList(cards) {
  return (
    <div className="CardList w-1/2 mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {cards &&
          cards.cards.map((card) => (
            <Card key={card.word} team={card.team} word={card.word} />
          ))}
      </div>
    </div>
  );
}

export default CardList;
