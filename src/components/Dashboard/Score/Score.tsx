import React from "react";
import { ScoreProps } from "../../../types/types";

/**
 * Score Component
 *
 * This component renders the current score for each team: 'Red' and 'Blue'
 *
 * Updates the score on a socket event.
 *
 * Props: redScore, blueScore
 *
 * App -> GameContainer -> Score
 *
 */

function Score(props: ScoreProps) {
  const { redScore, blueScore } = props;
  return (
    <div className="Score">
      <h3>Score</h3>
      <div className="Score__teams">
        <div className="Score__team">
          <h4>Red</h4>
          <p>{redScore}</p>
        </div>
        <div className="Score__team">
          <h4>Blue</h4>
          <p>{blueScore}</p>
        </div>
      </div>
    </div>
  );
}

export default Score;
