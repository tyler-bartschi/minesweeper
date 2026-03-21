import { Handler } from 'aws-lambda';
import type { DeleteGameRequest, DeleteGameResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<DeleteGameRequest, DeleteGameResponse> = async (
  request: DeleteGameRequest,
): Promise<DeleteGameResponse> => {
  return gameService.deleteGame(request.authToken, request.gameId, request.requestId);
};
