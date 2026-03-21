import { Handler } from 'aws-lambda';
import type { LoginRequest, LoginResponse } from 'minesweeper-shared';
import { AuthService } from '../../service/AuthService';

const authService = new AuthService();

export const handler: Handler<LoginRequest, LoginResponse> = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  return authService.login(request.username, request.password, request.requestId);
};
