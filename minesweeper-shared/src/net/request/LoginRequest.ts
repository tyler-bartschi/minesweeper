import type { MinesweeperRequest } from './MinesweeperRequest';

export interface LoginRequest extends MinesweeperRequest {
  username: string;
  password: string;
}
