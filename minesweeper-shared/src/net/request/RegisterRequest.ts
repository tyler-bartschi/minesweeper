import type { MinesweeperRequest } from './MinesweeperRequest';

export interface RegisterRequest extends MinesweeperRequest {
  username: string;
  password: string;
}
