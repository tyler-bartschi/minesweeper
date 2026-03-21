import type { Difficulty } from '../../models/Game';
import type { MinesweeperResponse } from './MinesweeperResponse';

export interface GetLeaderboardResponse extends MinesweeperResponse {
  difficulty: Difficulty;
  entries: Array<{
    rank: number;
    username: string;
    duration: number;
    gameId: string;
    completedAt: string;
  }>;
}
