import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseAuth, ResponseUser } from './SharedResponseTypes';

export interface LoginResponse extends MinesweeperResponse {
  user: ResponseUser;
  auth: ResponseAuth;
}
