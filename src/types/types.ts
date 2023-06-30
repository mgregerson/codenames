export interface CardType {
  word: string;
  team: "red" | "blue" | "neutral" | "death";
  guess: "red" | "blue" | "neutral" | "";
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

export interface Teams {
  redTeam: TeamPlayer[];
  blueTeam: TeamPlayer[];
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
  handleGuess: Function;
}

export interface CardListProps {
  cards: Cards;
  guesses: Guesses;
  handleGuess: Function;
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
  handleGuess: Function;
  startGame: () => void;
}

interface Guess {
  word: string;
  team: string;
  guess: string;
}

export type Guesses = Guess[];

export type Cards = CardType[];
