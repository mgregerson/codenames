import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ClueTableProps } from "../../../types/types";

const DisplayClue: React.FC<ClueTableProps> = ({ clue, numGuesses }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Clue</TableCell>
            <TableCell>Number of Guesses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{clue}</TableCell>
            <TableCell>{numGuesses}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayClue;
