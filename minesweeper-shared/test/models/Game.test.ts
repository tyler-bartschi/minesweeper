import { Game, GameBoard, Score } from "../../src/models/Game";

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

describe("Game Model", () => {
  const gameId = "game-id";
  const gameName = "boarded game";
  const board = new GameBoard();
  const startedAt = new Date("2026-01-01T08:00:00Z");
  const status: "in_progress" | "lost" | "won" = "in_progress";
  const difficulty: "easy" | "medium" | "hard" = "medium";
  const duration = 45;
  let game: Game;

  beforeEach(() => {
    game = new Game(gameId, gameName, board, startedAt, status, difficulty, duration);
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
