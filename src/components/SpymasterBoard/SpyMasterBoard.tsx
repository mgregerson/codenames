import React from "react";
import "./SpyMasterBoard.css";
import { SpymasterBoardProps } from "../../types/types";

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
      }

      return <div key={index} className={`card ${colorClass}`}></div>;
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
