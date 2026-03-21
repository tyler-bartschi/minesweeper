import type { MinesweeperRequest } from './MinesweeperRequest';

export interface LogoutRequest extends MinesweeperRequest {
  authToken: string;
}
