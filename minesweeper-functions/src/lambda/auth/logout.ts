import { Handler } from 'aws-lambda';
import type { LogoutRequest, LogoutResponse } from 'minesweeper-shared';
import { AuthService } from '../../service/AuthService';

const authService = new AuthService();

export const handler: Handler<LogoutRequest, LogoutResponse> = async (
  request: LogoutRequest,
): Promise<LogoutResponse> => {
  return authService.logout(request.authToken, request.requestId);
};
