import type {
  DeleteAccountResponse,
  UpdateCredentialsResponse,
} from 'minesweeper-shared';
import { AccountDao } from '../dao/AccountDao';

export class AccountService {
  constructor(private readonly accountDao: AccountDao = new AccountDao()) {}

  async updateCredentials(
    authToken: string,
    currentPassword: string,
    newUsername: string | undefined,
    newPassword: string | undefined,
    requestId: string,
  ): Promise<UpdateCredentialsResponse> {
    void authToken;
    void currentPassword;
    void newUsername;
    void newPassword;
    void requestId;
    void this.accountDao;
    throw new Error('Not implemented');
  }

  async deleteAccount(
    authToken: string,
    password: string,
    deleteGames: boolean,
    requestId: string,
  ): Promise<DeleteAccountResponse> {
    void authToken;
    void password;
    void deleteGames;
    void requestId;
    void this.accountDao;
    throw new Error('Not implemented');
  }
}
