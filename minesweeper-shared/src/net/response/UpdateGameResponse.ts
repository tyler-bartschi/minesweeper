import type { MinesweeperResponse } from './MinesweeperResponse';
import type { Status } from '../../models/Game';

export interface UpdateGameResponse extends MinesweeperResponse {
  game: {
    gameId: string;
    status: Status;
    lastUpdated: string;
    duration: number;
  };
}
