import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LeaderboardDao } from '../dao/LeaderboardDao';

export class LeaderboardService {
  constructor(
    private readonly leaderboardDao: LeaderboardDao = new LeaderboardDao(),
  ) {}

  async getLeaderboard(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.leaderboardDao;
    throw new Error('Not implemented');
  }
}
