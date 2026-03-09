import {
  Game,
  GameBoard,
  Score,
  Tile,
  Status,
  Difficulty,
} from "../../src/models/Game";

describe("Score Model", () => {
  let score: Score;

  const gameId: string = "gameId";
  const gameName: string = "gameName";
  const difficulty: "easy" | "medium" | "hard" = "easy";
  const duration: number = 123;

  beforeEach(() => {
    score = new Score(gameId, gameName, difficulty, duration);
  });

  it("returns the correct gameId", () => {
    expect(score.gameId).toEqual(gameId);
  });

  it("returns the correct gameName", () => {
    expect(score.gameName).toEqual(gameName);
  });

  it("returns the correct difficulty", () => {
    expect(score.difficulty).toEqual(difficulty);
  });

  it("returns the correct score/duration", () => {
    expect(score.duration).toEqual(duration);
    expect(score.score).toEqual(duration);
  });

  it("formats to a consistent string", () => {
    expect(score.toString()).toBe(`EASY - ${gameName}: ${duration}`);
  });

  it("supports numeric comparisons via valueOf", () => {
    const fasterDuration = duration - 10;
    const fasterScore = new Score(gameId, gameName, difficulty, fasterDuration);

    expect(fasterScore < score).toBe(true);
    expect(score > fasterScore).toBe(true);
    expect(+score).toEqual(duration);
  });

  it("orders scores with compare", () => {
    const shorterDuration = duration - 15;
    const shorterScore = new Score(
      `${gameId}-short`,
      gameName,
      difficulty,
      shorterDuration,
    );

    expect(Score.compare(shorterScore, score)).toBeLessThan(0);
    expect(Score.compare(score, shorterScore)).toBeGreaterThan(0);
  });
});

describe("Tile Model", () => {
  const x = 2;
  const y = 3;
  const value = 5;
  let tile: Tile;

  beforeEach(() => {
    tile = new Tile(x, y, value);
  });

  it("exposes position and value", () => {
    expect(tile.x).toBe(x);
    expect(tile.y).toBe(y);
    expect(tile.value).toBe(value);
  });

  it("defaults to unrevealed and unflagged", () => {
    expect(tile.revealed).toBe(false);
    expect(tile.flagged).toBe(false);
  });

  it("allows overrides via constructor", () => {
    const flagged = true;
    const revealed = true;
    const customTile = new Tile(x, y, value, revealed, flagged);

    expect(customTile.revealed).toBe(true);
    expect(customTile.flagged).toBe(true);
  });

  it("correctly sets the flagged and revealed flags through setters", () => {
    expect(tile.flagged).toBe(false);
    expect(tile.revealed).toBe(false);

    tile.setFlagged(true);
    tile.setRevealed(true);

    expect(tile.flagged).toBe(true);
    expect(tile.revealed).toBe(true);

    tile.setFlagged(false);
    expect(tile.flagged).toBe(false);
  });
});

describe("GameBoard Model", () => {
  let board: GameBoard;
  let tile00: Tile;
  let tile01: Tile;
  let tile10: Tile;
  let tiles2d: Tile[][];

  beforeEach(() => {
    tile00 = new Tile(0, 0, 1);
    tile01 = new Tile(1, 0, 2);
    tile10 = new Tile(0, 1, 3);
    const tile11 = new Tile(1, 1, 4);

    tiles2d = [
      [tile00, tile01],
      [tile10, tile11],
    ];

    board = new GameBoard(tiles2d);
  });

  it("returns tiles via getter and getTile", () => {
    expect(board.tiles[0][0]).toBe(tile00);
    expect(board.getTile(1, 1)).toBe(tiles2d[1][1]);
    expect(() => board.getTile(5, 5)).toThrow(/Tile not found/);
  });

  it("sets and clears the flagged state", () => {
    expect(tile01.flagged).toBe(false);

    board.flagTile(1, 0, true);
    expect(tile01.flagged).toBe(true);

    board.flagTile(1, 0, false);
    expect(tile01.flagged).toBe(false);
  });

  it("reveals a tile", () => {
    expect(tile10.revealed).toBe(false);

    board.revealTile(0, 1);
    expect(tile10.revealed).toBe(true);
  });

  it("throws when modifying non-existent tiles", () => {
    expect(() => board.flagTile(15, 0, true)).toThrow(/Tile not found/);
    expect(() => board.revealTile(0, 99)).toThrow(/Tile not found/);
  });
});

describe("Game Model", () => {
  const gameId = "game-id";
  const gameName = "boarded game";
  const board = new GameBoard([[new Tile(0, 0, 0)]]);
  const startedAt = new Date("2026-01-01T08:00:00Z");
  const status: Status = "in_progress";
  const difficulty: Difficulty = "medium";
  const duration = 45;
  let game: Game;

  beforeEach(() => {
    game = new Game(
      gameId,
      gameName,
      board,
      startedAt,
      status,
      difficulty,
      duration,
    );
  });

  it("exposes all the constructor fields via getters", () => {
    expect(game.gameId).toBe(gameId);
    expect(game.gameName).toBe(gameName);
    expect(game.board).toBe(board);
    expect(game.startedAt).toBe(startedAt);
    expect(game.status).toBe(status);
    expect(game.difficulty).toBe(difficulty);
    expect(game.duration).toBe(duration);
  });
});
