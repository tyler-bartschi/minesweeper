import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GameDao } from '../dao/GameDao';

export class GameService {
  constructor(private readonly gameDao: GameDao = new GameDao()) {}

  async createGame(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async listGames(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async getGame(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async resumeGame(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async updateGame(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async deleteGame(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }
}
