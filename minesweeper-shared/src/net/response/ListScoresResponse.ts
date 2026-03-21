import type { Difficulty } from '../../models/Game';
import type { MinesweeperResponse } from './MinesweeperResponse';

export interface ListScoresResponse extends MinesweeperResponse {
  scores: Array<{
    gameId: string;
    gameName: string;
    difficulty: Difficulty;
    duration: number;
    completedAt: string;
  }>;
  nextCursor: string | null;
}
