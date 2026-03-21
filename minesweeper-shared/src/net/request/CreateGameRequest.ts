import type { Difficulty } from '../../models/Game';
import type { MinesweeperRequest } from './MinesweeperRequest';

export interface CreateGameRequest extends MinesweeperRequest {
  authToken: string;
  gameName: string;
  difficulty: Difficulty;
}
