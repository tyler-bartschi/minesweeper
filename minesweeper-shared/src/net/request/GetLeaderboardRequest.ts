import type { Difficulty } from '../../models/Game';
import type { MinesweeperRequest } from './MinesweeperRequest';

export interface GetLeaderboardRequest extends MinesweeperRequest {
  difficulty?: Difficulty;
  limit?: number;
}
