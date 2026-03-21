import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseGameWithBoard } from './SharedResponseTypes';

export interface CreateGameResponse extends MinesweeperResponse {
  game: ResponseGameWithBoard;
}
