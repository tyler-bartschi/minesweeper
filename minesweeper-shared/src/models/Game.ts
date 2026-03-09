export class Score {
  private _gameId: string;
  private _gameName: string;
  private _difficulty: "easy" | "medium" | "hard";
  private _duration: number;

  public static compare(a: Score, b: Score): number {
    // compare function, for use in a sorting algorithm like array.sort()
    return a.duration - b.duration;
  }

  public constructor(
    gameId: string,
    gameName: string,
    difficulty: string,
    startedAt: Date,
    endedAt: Date,
  ) {
    difficulty = difficulty.toLowerCase().trim();
    if (!["easy", "medium", "hard"].find((item) => item === difficulty)) {
      throw new TypeError(
        `Difficulty must be: "easy", "medium", or "hard" - provided ${difficulty}`,
      );
    }

    this._gameId = gameId;
    this._gameName = gameName;
    this._difficulty = difficulty as "easy" | "medium" | "hard";
    this._duration = Math.floor(
      (endedAt.getTime() - startedAt.getTime()) / (1000 * 60),
    );
  }

  public get gameId(): string {
    return this._gameId;
  }

  public get gameName(): string {
    return this._gameName;
  }

  public get difficulty(): string {
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
