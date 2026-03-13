import { FakeData } from "../src/FakeData";
import {
  Game,
  GameBoard,
  Score,
  Tile,
  Status,
  Difficulty,
} from "../src/models/Game";
import { Auth, User } from "../src/models/User";

describe("FakeData", () => {
  const fakeData = FakeData.instance;

  describe("createTile", () => {
    it("applies overrides to a generated tile", () => {
      const tile = fakeData.createTile({
        x: 1,
        y: 2,
        value: -1,
        revealed: true,
        flagged: true,
      });

      expect(tile).toBeInstanceOf(Tile);
      expect(tile.x).toBe(1);
      expect(tile.y).toBe(2);
      expect(tile.value).toBe(-1);
      expect(tile.revealed).toBe(true);
      expect(tile.flagged).toBe(true);
    });
  });

  describe("createGameBoard", () => {
    it("returns a board sized for the requested difficulty", () => {
      const easyBoard = fakeData.createGameBoard("easy");

      expect(easyBoard).toBeInstanceOf(GameBoard);
      expect(easyBoard.tiles).toHaveLength(10);
      expect(easyBoard.tiles[0]).toHaveLength(10);
      expect(easyBoard.numMines).toBe(10);

      const mediumBoard = fakeData.createGameBoard("medium");
      
      expect(mediumBoard).toBeInstanceOf(GameBoard);
      expect(mediumBoard.tiles).toHaveLength(50);
      expect(mediumBoard.tiles[0]).toHaveLength(50);
      expect(mediumBoard.numMines).toBe(50);

      const hardBoard = fakeData.createGameBoard("hard");

      expect(hardBoard).toBeInstanceOf(GameBoard);
      expect(hardBoard.tiles).toHaveLength(100);
      expect(hardBoard.tiles[0]).toHaveLength(100);
      expect(hardBoard.numMines).toBe(100);
    });
  });

  describe("createScore", () => {
    it("respects overrides and returns a Score instance", () => {
      const score = fakeData.createScore({
        gameId: "game-test",
        gameName: "Fake Game",
        difficulty: "hard",
        duration: 999,
      });

      expect(score).toBeInstanceOf(Score);
      expect(score.gameId).toBe("game-test");
      expect(score.gameName).toBe("Fake Game");
      expect(score.difficulty).toBe("hard");
      expect(score.duration).toBe(999);
    });
  });

  describe("createGame", () => {
    it("creates a Game with injected values", () => {
      const difficulty: Difficulty = "medium";
      const board = fakeData.createGameBoard(difficulty);
      const startedAt = new Date("2025-01-03T00:00:00Z");
      const status: Status = "won";

      const game = fakeData.createGame({
        gameId: "game-overrides",
        gameName: "Override Game",
        board,
        startedAt,
        status,
        difficulty,
        duration: 321,
      });

      expect(game).toBeInstanceOf(Game);
      expect(game.gameId).toBe("game-overrides");
      expect(game.gameName).toBe("Override Game");
      expect(game.board).toBe(board);
      expect(game.startedAt).toBe(startedAt);
      expect(game.status).toBe(status);
      expect(game.difficulty).toBe(difficulty);
      expect(game.duration).toBe(321);
    });
  });

  describe("createUser", () => {
    it("honors overrides and returns a User", () => {
      const customScore = new Score("game-1", "Score Game", "easy", 111);
      const user = fakeData.createUser({
        userId: "user-test",
        username: "TestUser",
        password: "secret",
        scores: [customScore],
      });

      expect(user).toBeInstanceOf(User);
      expect(user.userId).toBe("user-test");
      expect(user.username).toBe("TestUser");
      expect(user.password).toBe("secret");
      expect(user.scores).toEqual([customScore]);
    });
  });

  describe("createAuth", () => {
    it("returns Auth tied to the requested user", () => {
      const auth = fakeData.createAuth("user-auth");

      expect(auth).toBeInstanceOf(Auth);
      expect(auth.userId).toBe("user-auth");
      expect(auth.authToken).toMatch(/^auth-/);
    });
  });

  describe("getHighScores", () => {
    it("produces the requested number of scores", () => {
      const scores = fakeData.getHighScores(4, "easy");

      expect(scores).toHaveLength(4);
      scores.forEach((score) => {
        expect(score).toBeInstanceOf(Score);
        expect(score.difficulty).toBe("easy");
      });
    });
  });

  describe("getGames", () => {
    it("reuses overrides for each generated game", () => {
      const games = fakeData.getGames(2, { status: "lost", difficulty: "medium" });

      expect(games).toHaveLength(2);
      games.forEach((game) => {
        expect(game).toBeInstanceOf(Game);
        expect(game.status).toBe("lost");
        expect(game.difficulty).toBe("medium");
      });
    });
  });

  describe("getGame", () => {
    it("returns a single Game honoring overrides", () => {
      const game = fakeData.getGame({ difficulty: "easy", status: "in_progress" });

      expect(game).toBeInstanceOf(Game);
      expect(game.difficulty).toBe("easy");
      expect(game.status).toBe("in_progress");
    });
  });

  describe("getUsers", () => {
    it("generates multiple users with the same username override", () => {
      const users = fakeData.getUsers(2, { username: "SharedName" });

      expect(users).toHaveLength(2);
      users.forEach((user) => {
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe("SharedName");
      });
    });
  });

  describe("getUser", () => {
    it("returns a single user honoring overrides", () => {
      const user = fakeData.getUser({ username: "Solo" });

      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe("Solo");
    });
  });

  describe("getScores", () => {
    it("returns a score list of the requested size", () => {
      const scores = fakeData.getScores(3, "hard");

      expect(scores).toHaveLength(3);
      scores.forEach((score) => {
        expect(score).toBeInstanceOf(Score);
      });
    });
  });

  describe("getGameBoards", () => {
    it("returns boards matching the difficulty size", () => {
      const boards = fakeData.getGameBoards(3, "hard");

      expect(boards).toHaveLength(3);
      boards.forEach((board) => {
        expect(board).toBeInstanceOf(GameBoard);
        expect(board.tiles).toHaveLength(100);
        expect(board.tiles[0]).toHaveLength(100);
      });
    });
  });

  describe("getGameBoard", () => {
    it("returns a single board with the requested difficulty", () => {
      const board = fakeData.getGameBoard("medium");

      expect(board).toBeInstanceOf(GameBoard);
      expect(board.tiles).toHaveLength(50);
      expect(board.tiles[0]).toHaveLength(50);
    });
  });

  describe("getTiles", () => {
    it("produces the requested number of tiles", () => {
      const tiles = fakeData.getTiles(6);

      expect(tiles).toHaveLength(6);
      tiles.forEach((tile) => {
        expect(tile).toBeInstanceOf(Tile);
      });
    });
  });
});
