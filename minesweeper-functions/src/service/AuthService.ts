import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthDao } from '../dao/AuthDao';

export class AuthService {
  constructor(private readonly authDao: AuthDao = new AuthDao()) {}

  async register(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }

  async login(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }

  async logout(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }
}
