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
    <div
      className="w-full flex justify-end landscape:justify-center"
      style={{ opacity: 1, transform: "none" }}
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={clueData.clue}
          onChange={(e) => setClueData({ ...clueData, clue: e.target.value })}
          placeholder="Type Your Clue Here"
          required
          className="rounded-md shadow-sm bg-white px-4 py-2 outline-none"
          style={{ zIndex: 1 }}
        />
        <input
          type="number"
          value={clueData.numGuesses}
          onChange={(e) =>
            setClueData({ ...clueData, numGuesses: parseInt(e.target.value) })
          }
          placeholder="Number of Guesses"
          required
          className="rounded-md shadow-sm bg-white px-4 py-2 outline-none"
          style={{ zIndex: 1 }}
        />
        <button
          type="submit"
          className="bg-emerald-700 rounded-md px-4 py-2 text-white bg-opacity-100 z-0"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProvideClue;
