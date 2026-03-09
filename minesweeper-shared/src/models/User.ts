import { Score } from "./Game";

export class User {
  private _userId: string;
  private _username: string;
  private _password: string;
  private _scores: Score[];

  public constructor(
    userId: string,
    username: string,
    password: string,
    scores: Score[],
  ) {
    this._userId = userId;
    this._username = username;
    this._password = password;
    this._scores = scores;
  }

  public get userId(): string {
    return this._userId;
  }

  public get username(): string {
    return this._username;
  }

  public get password(): string {
    return this._password;
  }

  public get scores(): readonly Score[] {
    return this._scores;
  }
}

export class Auth {
  private _userId: string;
  private _authToken: string;

  public constructor(userId: string, authToken: string) {
    this._userId = userId;
    this._authToken = authToken;
  }

  public get userId(): string {
    return this._userId;
  }

  public get authToken(): string {
    return this._authToken;
  }
}
