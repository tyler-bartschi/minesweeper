import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseGameWithBoard } from './SharedResponseTypes';

export interface GetGameResponse extends MinesweeperResponse {
  game: ResponseGameWithBoard;
}
