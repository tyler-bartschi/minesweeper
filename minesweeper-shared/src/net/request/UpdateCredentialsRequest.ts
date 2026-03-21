import type { MinesweeperRequest } from './MinesweeperRequest';

export interface UpdateCredentialsRequest extends MinesweeperRequest {
  authToken: string;
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}
