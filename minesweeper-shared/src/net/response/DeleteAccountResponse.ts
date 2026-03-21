import type { MinesweeperResponse } from './MinesweeperResponse';

export interface DeleteAccountResponse extends MinesweeperResponse {
  success: boolean;
  message: string;
  deleted: {
    userId: string;
    gamesRemoved: number;
    tokensRevoked: number;
  };
}
