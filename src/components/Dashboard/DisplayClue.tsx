import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
import { ClueTableProps } from "../../types/types";

const DisplayClue: React.FC<ClueTableProps> = ({ clue, numGuesses }) => {
  return (
    <div className="flex justify-center w-3/4">
      <div className="flex-1 bg-white rounded-lg p-1 flex items-center justify-center border-4 border-red-dark">
        <p className="m-0 font-bold uppercase">{clue}</p>
      </div>
      <div className="flex-1 bg-white rounded-lg p-1 ml-1 mr-1 flex items-center justify-center border-4 border-red-dark">
        <p className="m-0 font-bold">{numGuesses}</p>
      </div>
    </div>
  );
};

export default DisplayClue;
