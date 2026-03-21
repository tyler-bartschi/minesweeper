import type { LoginResponse, LogoutResponse, RegisterResponse } from 'minesweeper-shared';
import { AuthDao } from '../dao/AuthDao';

export class AuthService {
  constructor(private readonly authDao: AuthDao = new AuthDao()) {}

  async register(
    username: string,
    password: string,
    requestId: string,
  ): Promise<RegisterResponse> {
    void username;
    void password;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }

  async login(
    username: string,
    password: string,
    requestId: string,
  ): Promise<LoginResponse> {
    void username;
    void password;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }

  async logout(authToken: string, requestId: string): Promise<LogoutResponse> {
    void authToken;
    void requestId;
    void this.authDao;
    throw new Error('Not implemented');
  }
}
