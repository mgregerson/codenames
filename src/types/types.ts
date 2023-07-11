/** Game Related Interfaces */

export interface CardType {
  word: string;
  team: "red" | "blue" | "neutral" | "death";
  guess: "red" | "blue" | "neutral" | "";
  selected: boolean;
}

interface Guess {
  word: string;
  team: string;
  guess: string;
  selected: boolean;
}

export type Guesses = Guess[];

export type Cards = CardType[];

/** Player-related interfaces */

export interface Player {
  playerName: string;
  team: "red" | "blue";
  role: "guesser" | "spymaster";
}

export interface TeamPlayer {
  team: "red" | "blue";
  role: string;
  name: string;
  id: string;
}

export interface Team {
  players: TeamPlayer[];
  score: number;
}

export interface Teams {
  red: Team;
  blue: Team;
}

export type PlayerRegistrationData = {
  playerName: string;
  team: string;
  role: string;
};

/** Component Props Interfaces */

export interface CardProps {
  word: string;
  team: string;
  guess: string;
  currTeam: "red" | "blue";
  player: Player;
}

export interface CardListProps {
  cards: Cards;
  guesses: Guesses;
  currTeam: "red" | "blue";
  player: Player;
}

export interface ClueTableProps {
  clue: string;
  numGuesses: number;
}

export interface DisplayWinnerProps {
  winningTeam: string;
  players: TeamPlayer[];
}

export interface GameContainerProps {
  player: Player;
  cards: Cards;
  guesses: Guesses;
  teams: Teams;
  startGame: () => void;
  currTeam: "red" | "blue";
  currClue: { clue: string; numGuesses: number };
}

export interface PlayerListProps {
  redTeam: Array<{ team: string; role: string; name: string; id: string }>;
  blueTeam: Array<{ team: string; role: string; name: string; id: string }>;
}

export interface ProvideClueProps {
  emitClue: (clueData: { clue: string; numGuesses: number }) => void;
}

export interface ScoreProps {
  redScore: number;
  blueScore: number;
}

export interface SpymasterBoardProps {
  cards: Cards;
}

export interface SpymasterContainerProps {
  currTeam: string;
  player: Player;
  cards: CardType[];
}

export interface TeamBoardProps {
  players: TeamPlayer[];
  teamColor: "red" | "blue";
  teamScore: number | null;
}
