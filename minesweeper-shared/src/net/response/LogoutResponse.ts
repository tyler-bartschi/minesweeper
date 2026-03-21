import type { MinesweeperResponse } from './MinesweeperResponse';

export interface LogoutResponse extends MinesweeperResponse {
  success: boolean;
  message: string;
}
