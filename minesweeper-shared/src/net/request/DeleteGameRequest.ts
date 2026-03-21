import type { MinesweeperRequest } from './MinesweeperRequest';

export interface DeleteGameRequest extends MinesweeperRequest {
  authToken: string;
  gameId: string;
}
