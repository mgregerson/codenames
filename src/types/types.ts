export interface CardType {
  word: string;
  team: "red" | "blue" | "neutral" | "death";
  guess: "red" | "blue" | "neutral" | "";
  selected: boolean;
}

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
  score: boolean;
}

// includes players[] and score, a boolean
export interface Teams {
  red: Team;
  blue: Team;
}

export interface SpymasterBoardProps {
  cards: Cards;
}

export type PlayerRegistrationData = {
  playerName: string;
  team: string;
  role: string;
};

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

export interface PlayerListProps {
  redTeam: Array<{ team: string; role: string; name: string; id: string }>;
  blueTeam: Array<{ team: string; role: string; name: string; id: string }>;
}

export interface GameContainerProps {
  player: Player;
  cards: Cards;
  guesses: Guesses;
  teams: Teams;
  startGame: () => void;
  currTeam: "red" | "blue";
  numGuesses: number | "null";
}

interface Guess {
  word: string;
  team: string;
  guess: string;
  selected: boolean;
}

export type Guesses = Guess[];

export type Cards = CardType[];
