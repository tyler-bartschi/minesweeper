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
  private _numMines: number;
  private _minesFound: number;
  private _minesLeft: number;

  public static buildGameBoard(difficulty: Difficulty): GameBoard {
    let rows: number;
    let columns: number;
    let numMines: number;

    // EASY is 10x10 with 10 mines
    // MEDIUM is 50x50 with 50 mines
    // HARD is 100x100 with 100 mines
    switch (difficulty) {
      case "easy":
        rows = 10;
        columns = 10;
        numMines = 10;
        break;
      case "medium":
        rows = 50;
        columns = 50;
        numMines = 50;
        break;
      case "hard":
        rows = 100;
        columns = 100;
        numMines = 100;
        break;
      default:
        throw new Error(`Unsupported difficulty: ${difficulty}`);
    }

    const totalTiles = rows * columns;
    const mineIndices = new Set<number>();
    while (mineIndices.size < numMines) {
      mineIndices.add(Math.floor(Math.random() * totalTiles));
    }

    const values: number[][] = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => 0),
    );

    mineIndices.forEach((index) => {
      const y = Math.floor(index / columns);
      const x = index % columns;
      values[y][x] = -1;
    });

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (values[y][x] === -1) {
          continue;
        }

        let adjacentMines = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) {
              continue;
            }

            const ny = y + dy;
            const nx = x + dx;

            if (ny < 0 || ny >= rows || nx < 0 || nx >= columns) {
              continue;
            }

            if (values[ny][nx] === -1) {
              adjacentMines++;
            }
          }
        }

        values[y][x] = adjacentMines;
      }
    }

    const tiles: Tile[][] = values.map((row, y) =>
      row.map((value, x) => new Tile(x, y, value)),
    );

    return new GameBoard(tiles, numMines, 0, numMines);
  }

  public constructor(tiles: Tile[][], numMines: number, minesFound: number, minesLeft: number) {
    this._tiles = tiles;
    this._numMines = numMines;
    this._minesFound = minesFound;
    this._minesLeft = minesLeft;
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

  public get numMines(): number {
    return this._numMines;
  }

  public get minesFound(): number {
    return this._minesFound;
  }

  public get minesLeft(): number {
    return this._minesLeft;
  }

  public flagTile(x: number, y: number, flag: boolean): void {
    const tile = this.getTileInternal(x, y);
    const wasFlagged = tile.flagged;
    if (wasFlagged === flag) {
      return;
    }

    tile.setFlagged(flag);

    if (flag) {
      this._minesFound = Math.min(this._numMines, this._minesFound + 1);
    } else {
      this._minesFound = Math.max(0, this._minesFound - 1);
    }

    this._minesLeft = this._numMines - this._minesFound;
  }

  public revealTile(x: number, y: number): void {
    this.getTileInternal(x, y).setRevealed(true);
  }
}
