import type { MinesweeperResponse } from './MinesweeperResponse';
import type { ResponseGame } from './SharedResponseTypes';

export interface ListGamesResponse extends MinesweeperResponse {
  games: ResponseGame[];
  nextCursor: string | null;
}
