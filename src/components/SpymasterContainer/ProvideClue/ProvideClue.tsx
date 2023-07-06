import React, { useState, FormEvent } from "react";
import { ProvideClueProps } from "../../../types/types";

// clue is equal to the value of the input fields: clue: a string, and numGuesses:
//a number
// clue is passed to the server via emitClue

interface clueState {
  clue: string;
  numGuesses: number;
}

function ProvideClue({ emitClue }: ProvideClueProps) {
  const [clueData, setClueData] = useState<clueState>({
    clue: "",
    numGuesses: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emitClue(clueData);
    setClueData({ clue: "", numGuesses: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={clueData.clue}
        onChange={(e) => setClueData({ ...clueData, clue: e.target.value })}
        placeholder="Enter a clue"
        required
      />
      <input
        type="number"
        value={clueData.numGuesses}
        onChange={(e) =>
          setClueData({ ...clueData, numGuesses: parseInt(e.target.value) })
        }
        placeholder="Number of Guesses"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProvideClue;
