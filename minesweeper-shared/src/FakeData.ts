import { Difficulty, Game, GameBoard, Score, Status, Tile } from "./models/Game";
import { Auth, User } from "./models/User";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const STATUSES: Status[] = ["in_progress", "lost", "won"];
const GAME_ADJECTIVES = [
  "Sunrise",
  "Storm",
  "Echo",
  "Cipher",
  "Orbit",
  "Northwind",
  "Mirage",
  "Harbor",
];
const USERNAMES = [
  "NovaExplorer",
  "PixelPilot",
  "MineWalker",
  "GridGuardian",
  "FlagSeeker",
  "RasterRanger",
  "Clockwork",
  "QuietStorm",
];

interface ScoreProps {
  gameId: string;
  gameName: string;
  difficulty: Difficulty;
  duration: number;
};

interface GameProps {
  gameId?: string;
  gameName?: string;
  board?: GameBoard;
  startedAt?: Date;
  status?: Status;
  difficulty?: Difficulty;
  duration?: number;
};

interface TileProps {
  x?: number;
  y?: number;
  value?: number;
  revealed?: boolean;
  flagged?: boolean;
};

interface UserProps {
  userId?: string;
  username?: string;
  password?: string;
  scores?: Score[];
  scoreCount?: number;
  scoreDifficulty?: Difficulty;
};

export class FakeData {
  public static readonly instance = new FakeData();

  private gameIdSequence = 1;
  private userIdSequence = 1;
  private authSequence = 1;

  private constructor() {}

  private randomChoice<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomDuration(difficulty: Difficulty): number {
    const ranges: Record<Difficulty, [number, number]> = {
      easy: [30, 90],
      medium: [120, 240],
      hard: [300, 600],
    };

    const [min, max] = ranges[difficulty];
    return Math.round(min + Math.random() * (max - min));
  }

  private randomDate(daysBack = 14): Date {
    const now = Date.now();
    const past = now - Math.floor(Math.random() * daysBack) * 86_400_000;
    return new Date(past);
  }

  private nextId(prefix: string): string {
    switch (prefix) {
      case "game":
        return `${prefix}-${this.gameIdSequence++}`;
      case "user":
        return `${prefix}-${this.userIdSequence++}`;
      case "auth":
        return `${prefix}-${this.authSequence++}`;
      default:
        return `${prefix}-${Math.floor(Math.random() * 10_000)}`;
    }
  }

  private randomGameName(): string {
    const adjective = this.randomChoice(GAME_ADJECTIVES);
    const number = Math.floor(Math.random() * 1000);
    return `${adjective} ${number}`;
  }

  private randomUsername(): string {
    return this.randomChoice(USERNAMES);
  }

  public createTile(overrides: TileProps = {}): Tile {
    const x = overrides.x ?? Math.floor(Math.random() * 10);
    const y = overrides.y ?? Math.floor(Math.random() * 10);
    const value = overrides.value ?? Math.floor(Math.random() * 9) - 1;
    const revealed = overrides.revealed ?? false;
    const flagged = overrides.flagged ?? false;

    return new Tile(x, y, value, revealed, flagged);
  }

  public createGameBoard(difficulty: Difficulty = this.randomChoice(DIFFICULTIES)): GameBoard {
    return GameBoard.buildGameBoard(difficulty);
  }

  public createScore(overrides: Partial<ScoreProps> = {}): Score {
    const difficulty = overrides.difficulty ?? this.randomChoice(DIFFICULTIES);
    const duration = overrides.duration ?? this.randomDuration(difficulty);
    const gameId = overrides.gameId ?? this.nextId("game");
    const gameName = overrides.gameName ?? this.randomGameName();

    return new Score(gameId, gameName, difficulty, duration);
  }

  public createGame(overrides: Partial<GameProps> = {}): Game {
    const difficulty = overrides.difficulty ?? this.randomChoice(DIFFICULTIES);
    const status = overrides.status ?? this.randomChoice(STATUSES);
    const board = overrides.board ?? this.createGameBoard(difficulty);
    const startedAt = overrides.startedAt ?? this.randomDate(30);
    const duration = overrides.duration ?? this.randomDuration(difficulty);
    const gameId = overrides.gameId ?? this.nextId("game");
    const gameName = overrides.gameName ?? this.randomGameName();

    return new Game(gameId, gameName, board, startedAt, status, difficulty, duration);
  }

  public createUser(overrides: Partial<UserProps> = {}): User {
    const userId = overrides.userId ?? this.nextId("user");
    const username = overrides.username ?? this.randomUsername();
    const password = overrides.password ?? `pass-${userId}`;
    const scoreCount = overrides.scoreCount ?? 3;
    const scores =
      overrides.scores ??
      this.getHighScores(scoreCount, overrides.scoreDifficulty).map((score) => score);

    return new User(userId, username, password, scores);
  }

  public createAuth(userId?: string): Auth {
    const resolvedUserId = userId ?? this.nextId("user");
    const token = `auth-${Math.random().toString(36).slice(2, 10)}`;
    return new Auth(resolvedUserId, token);
  }

  public getHighScores(count = 10, difficulty?: Difficulty): Score[] {
    return Array.from({ length: count }, () =>
      this.createScore({ difficulty: difficulty ?? this.randomChoice(DIFFICULTIES) }),
    );
  }

  public getGames(count = 3, overrides: Partial<GameProps> = {}): Game[] {
    return Array.from({ length: count }, () =>
      this.createGame(overrides),
    );
  }

  public getUsers(count = 2, overrides: Partial<UserProps> = {}): User[] {
    return Array.from({ length: count }, () =>
      this.createUser(overrides),
    );
  }

  public getScores(count = 5, difficulty?: Difficulty): Score[] {
    return this.getHighScores(count, difficulty);
  }

  public getGameBoards(count = 2, difficulty?: Difficulty): GameBoard[] {
    return Array.from({ length: count }, () =>
      this.createGameBoard(difficulty ?? this.randomChoice(DIFFICULTIES)),
    );
  }

  public getTiles(count = 5): Tile[] {
    return Array.from({ length: count }, () => this.createTile());
  }
}
