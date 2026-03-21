import type { Difficulty } from '../../models/Game';
import type { MinesweeperRequest } from './MinesweeperRequest';

export interface ListScoresRequest extends MinesweeperRequest {
  authToken: string;
  difficulty?: Difficulty;
  limit?: number;
  cursor?: string;
}
