import type {
  CreateGameResponse,
  DeleteGameResponse,
  Difficulty,
  GetGameResponse,
  ListGamesResponse,
  ResumeGameResponse,
  Status,
  UpdateGameBoardRequest,
  UpdateGameResponse,
} from 'minesweeper-shared';
import { GameDao } from '../dao/GameDao';

export class GameService {
  constructor(private readonly gameDao: GameDao = new GameDao()) {}

  async createGame(
    authToken: string,
    gameName: string,
    difficulty: Difficulty,
    requestId: string,
  ): Promise<CreateGameResponse> {
    void authToken;
    void gameName;
    void difficulty;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async listGames(
    authToken: string,
    status: Status | undefined,
    difficulty: Difficulty | undefined,
    limit: number | undefined,
    cursor: string | undefined,
    requestId: string,
  ): Promise<ListGamesResponse> {
    void authToken;
    void status;
    void difficulty;
    void limit;
    void cursor;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async getGame(authToken: string, gameId: string, requestId: string): Promise<GetGameResponse> {
    void authToken;
    void gameId;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async resumeGame(
    authToken: string,
    gameId: string,
    requestId: string,
  ): Promise<ResumeGameResponse> {
    void authToken;
    void gameId;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async updateGame(
    authToken: string,
    gameId: string,
    status: Status,
    duration: number,
    board: UpdateGameBoardRequest,
    lastMoveAt: string,
    requestId: string,
  ): Promise<UpdateGameResponse> {
    void authToken;
    void gameId;
    void status;
    void duration;
    void board;
    void lastMoveAt;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }

  async deleteGame(
    authToken: string,
    gameId: string,
    requestId: string,
  ): Promise<DeleteGameResponse> {
    void authToken;
    void gameId;
    void requestId;
    void this.gameDao;
    throw new Error('Not implemented');
  }
}
