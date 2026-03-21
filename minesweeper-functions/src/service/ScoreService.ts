import type { Difficulty, ListScoresResponse } from 'minesweeper-shared';
import { ScoreDao } from '../dao/ScoreDao';

export class ScoreService {
  constructor(private readonly scoreDao: ScoreDao = new ScoreDao()) {}

  async listScores(
    authToken: string,
    difficulty: Difficulty | undefined,
    limit: number | undefined,
    cursor: string | undefined,
    requestId: string,
  ): Promise<ListScoresResponse> {
    void authToken;
    void difficulty;
    void limit;
    void cursor;
    void requestId;
    void this.scoreDao;
    throw new Error('Not implemented');
  }
}
