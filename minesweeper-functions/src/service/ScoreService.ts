import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ScoreDao } from '../dao/ScoreDao';

export class ScoreService {
  constructor(private readonly scoreDao: ScoreDao = new ScoreDao()) {}

  async listScores(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.scoreDao;
    throw new Error('Not implemented');
  }
}
