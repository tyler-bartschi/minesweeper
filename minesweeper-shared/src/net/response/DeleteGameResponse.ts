import type { MinesweeperResponse } from './MinesweeperResponse';

export interface DeleteGameResponse extends MinesweeperResponse {
  success: boolean;
  message: string;
  deleted: {
    gameId: string;
  };
}
