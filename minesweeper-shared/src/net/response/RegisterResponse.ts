import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseAuth, ResponseUser } from './SharedResponseTypes';

export interface RegisterResponse extends MinesweeperResponse {
  user: ResponseUser & { createdAt: string };
  auth: ResponseAuth;
}
