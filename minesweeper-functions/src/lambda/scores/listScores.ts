import { Handler } from 'aws-lambda';
import type { ListScoresRequest, ListScoresResponse } from 'minesweeper-shared';
import { ScoreService } from '../../service/ScoreService';

const scoreService = new ScoreService();

export const handler: Handler<ListScoresRequest, ListScoresResponse> = async (
  request: ListScoresRequest,
): Promise<ListScoresResponse> => {
  return scoreService.listScores(
    request.authToken,
    request.difficulty,
    request.limit,
    request.cursor,
    request.requestId,
  );
};
