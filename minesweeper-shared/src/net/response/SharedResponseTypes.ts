import type { Difficulty, Status } from '../../models/Game';

export interface ResponseUser {
  userId: string;
  username: string;
}

export interface ResponseAuth {
  authToken: string;
  expiresAt: string;
}

export interface ResponseTile {
  x: number;
  y: number;
  value: number;
  revealed: boolean;
  flagged: boolean;
}

export interface ResponseBoard {
  tiles: ResponseTile[][];
  numMines: number;
  minesFound: number;
  minesLeft: number;
}

export interface ResponseGame {
  gameId: string;
  gameName: string;
  difficulty: Difficulty;
  status: Status;
  startedAt: string;
  lastUpdated: string;
  duration: number;
}

export interface ResponseGameWithBoard extends ResponseGame {
  board: ResponseBoard;
}
