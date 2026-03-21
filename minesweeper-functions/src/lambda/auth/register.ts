import { Handler } from 'aws-lambda';
import type { RegisterRequest, RegisterResponse } from 'minesweeper-shared';
import { AuthService } from '../../service/AuthService';

const authService = new AuthService();

export const handler: Handler<RegisterRequest, RegisterResponse> = async (
  request: RegisterRequest,
): Promise<RegisterResponse> => {
  return authService.register(request.username, request.password, request.requestId);
};
