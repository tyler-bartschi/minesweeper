import { Handler } from 'aws-lambda';
import type { GetLeaderboardRequest, GetLeaderboardResponse } from 'minesweeper-shared';
import { LeaderboardService } from '../../service/LeaderboardService';

const leaderboardService = new LeaderboardService();

export const handler: Handler<GetLeaderboardRequest, GetLeaderboardResponse> = async (
  request: GetLeaderboardRequest,
): Promise<GetLeaderboardResponse> => {
  return leaderboardService.getLeaderboard(
    request.difficulty,
    request.limit,
    request.requestId,
  );
};
