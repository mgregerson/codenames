import React from "react";
import "./SpyMasterBoard.css";

interface SpymasterBoardProps {
  cards: { [key: number]: WordData };
}

interface WordData {
  word: string;
  team: "red" | "blue" | "neutral" | "death";
  guess: string;
}

function SpymasterBoard({ cards }: SpymasterBoardProps) {
  const renderBoard = () => {
    return Object.values(cards).map((card, index) => {
      let colorClass;
      if (card.team === "red") {
        colorClass = "red";
      } else if (card.team === "blue") {
        colorClass = "blue";
      } else if (card.team === "neutral") {
        colorClass = "gray";
      } else if (card.team === "death") {
        colorClass = "black";
      } else {
        colorClass = "gray"; // Default to gray for unknown team
      }

      return (
        <div key={index} className={`card ${colorClass}`}>
          {/* Display the word or any other content */}
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Board</h3>
      <div className="SpymasterBoard">{renderBoard()}</div>
    </div>
  );
}

export default SpymasterBoard;
