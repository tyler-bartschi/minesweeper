import type { Difficulty, Status } from '../../models/Game';
import type { MinesweeperRequest } from './MinesweeperRequest';

export interface ListGamesRequest extends MinesweeperRequest {
  authToken: string;
  status?: Status;
  difficulty?: Difficulty;
  limit?: number;
  cursor?: string;
}
