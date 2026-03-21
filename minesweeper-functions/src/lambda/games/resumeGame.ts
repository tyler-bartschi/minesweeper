import { Handler } from 'aws-lambda';
import type { ResumeGameRequest, ResumeGameResponse } from 'minesweeper-shared';
import { GameService } from '../../service/GameService';

const gameService = new GameService();

export const handler: Handler<ResumeGameRequest, ResumeGameResponse> = async (
  request: ResumeGameRequest,
): Promise<ResumeGameResponse> => {
  return gameService.resumeGame(request.authToken, request.gameId, request.requestId);
};
