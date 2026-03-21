import type { Difficulty, GetLeaderboardResponse } from 'minesweeper-shared';
import { LeaderboardDao } from '../dao/LeaderboardDao';

export class LeaderboardService {
  constructor(
    private readonly leaderboardDao: LeaderboardDao = new LeaderboardDao(),
  ) {}

  async getLeaderboard(
    difficulty: Difficulty | undefined,
    limit: number | undefined,
    requestId: string,
  ): Promise<GetLeaderboardResponse> {
    void difficulty;
    void limit;
    void requestId;
    void this.leaderboardDao;
    throw new Error('Not implemented');
  }
}
