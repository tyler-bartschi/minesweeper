import { Handler } from 'aws-lambda';
import type { UpdateGameRequest, UpdateGameResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<UpdateGameRequest, UpdateGameResponse> = async (
  request: UpdateGameRequest,
): Promise<UpdateGameResponse> => {
  return gameService.updateGame(
    request.authToken,
    request.gameId,
    request.status,
    request.duration,
    request.board,
    request.lastMoveAt,
    request.requestId,
  );
};
