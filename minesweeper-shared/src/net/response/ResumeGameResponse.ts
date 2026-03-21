import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseGameWithBoard } from './SharedResponseTypes';

export interface ResumeGameResponse extends MinesweeperResponse {
  game: ResponseGameWithBoard;
}
