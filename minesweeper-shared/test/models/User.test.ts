import { mock } from "@typestrong/ts-mockito";
import { User } from "../../src/models/User";
import { Score } from "../../src/models/Game";

describe("User Model", () => {
  let user: User;
  let mockScore1: Score;
  let mockScore2: Score;

  const userId: string = "userId";
  const username: string = "username";
  const password: string = "password";
  let scores: Score[];

  beforeEach(() => {
    mockScore1 = mock(Score);
    mockScore2 = mock(Score);
    scores = [mockScore1, mockScore2];

    user = new User(userId, username, password, scores);
  });

  it("returns the correct userId", () => {
    const retUserId = user.userId;

    expect(retUserId).toEqual(userId);
  });

  it("returns the correct username", () => {
    const retUsername = user.username;
    
    expect(retUsername).toEqual(username);
  });

  it("returns the correct password", () => {
    const retPassword = user.password;

    expect(retPassword).toEqual(password);
  });

  it("returns a readonly scores list", () => {
    const retScores = user.scores;

    expect(retScores).toEqual(scores);
  });
});
