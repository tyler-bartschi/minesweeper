import { Handler } from 'aws-lambda';
import type { ListGamesRequest, ListGamesResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<ListGamesRequest, ListGamesResponse> = async (
  request: ListGamesRequest,
): Promise<ListGamesResponse> => {
  return gameService.listGames(
    request.authToken,
    request.status,
    request.difficulty,
    request.limit,
    request.cursor,
    request.requestId,
  );
};
