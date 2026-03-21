import type { Status } from '../../models/Game';
import type { MinesweeperRequest } from './MinesweeperRequest';

export interface UpdateGameTileRequest {
  x: number;
  y: number;
  value: number;
  revealed: boolean;
  flagged: boolean;
}

export interface UpdateGameBoardRequest {
  tiles: UpdateGameTileRequest[][];
  numMines: number;
  minesFound: number;
  minesLeft: number;
}

export interface UpdateGameRequest extends MinesweeperRequest {
  authToken: string;
  gameId: string;
  status: Status;
  duration: number;
  board: UpdateGameBoardRequest;
  lastMoveAt: string;
}
