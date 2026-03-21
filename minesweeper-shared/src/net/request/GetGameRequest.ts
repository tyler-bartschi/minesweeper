import type { MinesweeperRequest } from './MinesweeperRequest';

export interface GetGameRequest extends MinesweeperRequest {
  authToken: string;
  gameId: string;
}
