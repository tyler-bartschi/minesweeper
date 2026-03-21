import type { MinesweeperRequest } from './MinesweeperRequest';

export interface DeleteAccountRequest extends MinesweeperRequest {
  authToken: string;
  password: string;
  deleteGames: boolean;
}
