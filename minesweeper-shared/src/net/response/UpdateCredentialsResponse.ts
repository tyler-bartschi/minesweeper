import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseUser } from './SharedResponseTypes';

export interface UpdateCredentialsResponse extends MinesweeperResponse {
  user: ResponseUser & { updatedAt: string };
}
