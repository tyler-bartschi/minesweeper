import { Handler } from 'aws-lambda';
import type { DeleteAccountRequest, DeleteAccountResponse } from 'minesweeper-shared';
import { AccountService } from '../../service/AccountService';

const accountService = new AccountService();

export const handler: Handler<DeleteAccountRequest, DeleteAccountResponse> = async (
  request: DeleteAccountRequest,
): Promise<DeleteAccountResponse> => {
  return accountService.deleteAccount(
    request.authToken,
    request.password,
    request.deleteGames,
    request.requestId,
  );
};
