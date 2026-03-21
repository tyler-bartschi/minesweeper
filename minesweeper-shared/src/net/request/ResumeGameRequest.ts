import type { MinesweeperRequest } from './MinesweeperRequest';

export interface ResumeGameRequest extends MinesweeperRequest {
  authToken: string;
  gameId: string;
}
