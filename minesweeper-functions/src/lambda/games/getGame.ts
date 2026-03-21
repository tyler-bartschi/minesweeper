import { Handler } from 'aws-lambda';
import type { GetGameRequest, GetGameResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<GetGameRequest, GetGameResponse> = async (
  request: GetGameRequest,
): Promise<GetGameResponse> => {
  return gameService.getGame(request.authToken, request.gameId, request.requestId);
};
