import { Handler } from 'aws-lambda';
import type { CreateGameRequest, CreateGameResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<CreateGameRequest, CreateGameResponse> = async (
  request: CreateGameRequest,
): Promise<CreateGameResponse> => {
  return gameService.createGame(
    request.authToken,
    request.gameName,
    request.difficulty,
    request.requestId,
  );
};
