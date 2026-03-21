import { Handler } from 'aws-lambda';
import type {
  UpdateCredentialsRequest,
  UpdateCredentialsResponse,
} from 'minesweeper-shared';
import { AccountService } from '../../service/AccountService';

const accountService = new AccountService();

export const handler: Handler<UpdateCredentialsRequest, UpdateCredentialsResponse> = async (
  request: UpdateCredentialsRequest,
): Promise<UpdateCredentialsResponse> => {
  return accountService.updateCredentials(
    request.authToken,
    request.currentPassword,
    request.newUsername,
    request.newPassword,
    request.requestId,
  );
};
