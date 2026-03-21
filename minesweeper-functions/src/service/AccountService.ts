import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AccountDao } from '../dao/AccountDao';

export class AccountService {
  constructor(private readonly accountDao: AccountDao = new AccountDao()) {}

  async updateCredentials(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.accountDao;
    throw new Error('Not implemented');
  }

  async deleteAccount(
    event: APIGatewayProxyEvent,
    requestId: string,
  ): Promise<APIGatewayProxyResult> {
    void event;
    void requestId;
    void this.accountDao;
    throw new Error('Not implemented');
  }
}
