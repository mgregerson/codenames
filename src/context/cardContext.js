import React, { createContext, useContext, useEffect, useState } from "react";
import codenamesApi from "../utils/api";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(() => {
    const storedCards = localStorage.getItem("cards");
    return storedCards ? JSON.parse(storedCards) : null;
  });

  useEffect(() => {
    async function getCards() {
      let fetchedCards;
      if (!cards) {
        fetchedCards = await codenamesApi.getCardsForGame();
        localStorage.setItem("cards", JSON.stringify(fetchedCards));
        setCards(fetchedCards);
      }
    }
    getCards();
  }, []); // Empty dependency array ensures the effect runs only once

  return <CardContext.Provider value={cards}>{children}</CardContext.Provider>;
}

export function useCardContext() {
  return useContext(CardContext);
}
