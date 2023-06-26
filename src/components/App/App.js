import "./App.css";
import codenamesApi from "../../utils/api";
import { useEffect, useState } from "react";
import React from "react";
import CardList from "../CardList/CardList.tsx";

function App() {
  const [cards, setCards] = useState(null);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    async function getCards() {
      const cards = await codenamesApi.getCardsForGame();
      setCards(cards);
    }
    getCards();
  }, []);

  console.log(cards);

  return <div className="App">{cards && <CardList cards={cards} />}</div>;
}

export default App;
