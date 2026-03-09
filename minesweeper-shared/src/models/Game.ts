export type Difficulty = "easy" | "medium" | "hard";
export type Status = "in_progress" | "lost" | "won";

export class Score {
  private _gameId: string;
  private _gameName: string;
  private _difficulty: Difficulty;
  private _duration: number;

  public static compare(a: Score, b: Score): number {
    // compare function, for use in a sorting algorithm like array.sort()
    return a.duration - b.duration;
  }

  public constructor(
    gameId: string,
    gameName: string,
    difficulty: Difficulty,
    duration: number,
  ) {
    this._gameId = gameId;
    this._gameName = gameName;
    this._difficulty = difficulty;
    this._duration = duration;
  }

  public get gameId(): string {
    return this._gameId;
  }

  public get gameName(): string {
    return this._gameName;
  }

  public get difficulty(): Difficulty {
    return this._difficulty;
  }

  public get duration(): number {
    return this._duration;
  }

  public get score(): number {
    return this._duration;
  }

  public toString(): string {
    return `${this.difficulty.toUpperCase()} - ${this.gameName}: ${this.duration}`;
  }

  public valueOf(): number {
    // enables plain < or > comparison
    return this._duration;
  }
}

export class Game {
  private _gameId: string;
  private _gameName: string;
  private _board: GameBoard;
  private _startedAt: Date;
  private _status: Status;
  private _difficulty: Difficulty;
  private _duration: number;

  public constructor(
    gameId: string,
    gameName: string,
    board: GameBoard,
    startedAt: Date,
    status: Status,
    difficulty: Difficulty,
    duration: number,
  ) {
    this._gameId = gameId;
    this._gameName = gameName;
    this._board = board;
    this._startedAt = startedAt;
    this._status = status;
    this._difficulty = difficulty;
    this._duration = duration;
  }

  public get gameId(): string {
    return this._gameId;
  }

  public get gameName(): string {
    return this._gameName;
  }

  public get board(): GameBoard {
    return this._board;
  }

  public get startedAt(): Date {
    return this._startedAt;
  }

  public get status(): Status {
    return this._status;
  }

  public get difficulty(): Difficulty {
    return this._difficulty;
  }

  public get duration(): number {
    return this._duration;
  }
}

export class Tile {
  private _x: number;
  private _y: number;
  private _value: number;
  private _revealed: boolean;
  private _flagged: boolean;

  public constructor(
    x: number,
    y: number,
    value: number,
    revealed: boolean = false,
    flagged: boolean = false,
  ) {
    this._x = x;
    this._y = y;
    this._value = value;
    this._revealed = revealed;
    this._flagged = flagged;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get value(): number {
    return this._value;
  }

  public get revealed(): boolean {
    return this._revealed;
  }

  public get flagged(): boolean {
    return this._flagged;
  }

  public setFlagged(flagged: boolean): void {
    this._flagged = flagged;
  }

  public setRevealed(revealed: boolean): void {
    this._revealed = revealed;
  }
}

export class GameBoard {
  private _tiles: Tile[][];

  public constructor(tiles: Tile[][]) {
    this._tiles = tiles;
  }

  public get tiles(): readonly Tile[][] {
    return this._tiles;
  }

  private getTileInternal(x: number, y: number): Tile {
    const tile = this._tiles[y]?.[x];
    if (!tile) {
      throw new Error(`Tile not found at (${x}, ${y})`);
    }

    return tile;
  }

  public getTile(x: number, y: number): Readonly<Tile> {
    return this.getTileInternal(x, y);
  }

  public flagTile(x: number, y: number, flag: boolean): void {
    this.getTileInternal(x, y).setFlagged(flag);
  }

  public revealTile(x: number, y: number): void {
    this.getTileInternal(x, y).setRevealed(true);
  }
}
