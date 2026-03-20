# Minesweeper API Endpoint Plan

## Shared Error Response (use for all endpoints)

All non-2xx responses should return this shape. This is compatible with API Gateway integration-response regex matching on `errorMessage`:

```json
{
  "errorMessage": "VALIDATION_ERROR: One or more request fields are invalid.",
  "statusCode": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more request fields are invalid.",
    "details": [
      {
        "field": "username",
        "issue": "username must be 3-32 chars"
      }
    ],
    "requestId": "2a2f43f5-5c6d-4d63-8f4e-4c2d8f093d07",
    "timestamp": "2026-03-19T17:04:12Z"
  }
}
```

API Gateway notes:
- For Lambda **non-proxy integration**, configure integration response regex patterns against `errorMessage` (for example, `^VALIDATION_ERROR:.*`, `^AUTH_ERROR:.*`, `^NOT_FOUND:.*`, `^CONFLICT_ERROR:.*`).
- For Lambda **proxy integration**, return `statusCode` and stringified `body`; keep this same JSON inside `body` for consistency.

`requestId` should come from the Lambda invocation context (`context.awsRequestId`) and be logged with server-side errors so support can correlate client-reported failures to CloudWatch log events.

## 1) Register User

**Path:** `POST /api/v1/auth/register`  
**Necessary headers:**
- `Content-Type: application/json`

**Request body:**
```json
{
  "username": "player_one",
  "password": "S3curePass!234"
}
```

**Success response (201):**
```json
{
  "user": {
    "userId": "e64e6be8-254e-4d7e-9f96-bc6f4e5da0cc",
    "username": "player_one",
    "createdAt": "2026-03-19T17:10:00Z"
  },
  "auth": {
    "authToken": "<jwt-or-random-token>",
    "expiresAt": "2026-03-26T17:10:00Z"
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: username/password missing or fails length/format rules. Suggested match string: `VALIDATION_ERROR: Invalid username or password format`
- `409 CONFLICT_ERROR`: username already exists. Suggested match string: `CONFLICT_ERROR: Username already exists`
- `500 INTERNAL_ERROR`: unexpected failure creating user/token records. Suggested match string: `INTERNAL_ERROR: Failed to register user`

**Description:** Creates a new account, stores user record, and returns an auth token so the client can start an authenticated session immediately.

## 2) Login

**Path:** `POST /api/v1/auth/login`  
**Necessary headers:**
- `Content-Type: application/json`

**Request body:**
```json
{
  "username": "player_one",
  "password": "S3curePass!234"
}
```

**Success response (200):**
```json
{
  "user": {
    "userId": "e64e6be8-254e-4d7e-9f96-bc6f4e5da0cc",
    "username": "player_one"
  },
  "auth": {
    "authToken": "<jwt-or-random-token>",
    "expiresAt": "2026-03-26T18:05:00Z"
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: missing username/password in request. Suggested match string: `VALIDATION_ERROR: Username and password are required`
- `401 AUTH_ERROR`: invalid username/password combination. Suggested match string: `AUTH_ERROR: Invalid credentials`
- `500 INTERNAL_ERROR`: unexpected authentication/token generation failure. Suggested match string: `INTERNAL_ERROR: Failed to log in`

**Description:** Authenticates credentials and returns a new auth token.

## 3) Logout

**Path:** `POST /api/v1/auth/logout`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:**
```json
{}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

**Error response:** Shared Error Response shape, with these codes:
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `500 INTERNAL_ERROR`: unexpected token revocation/storage failure. Suggested match string: `INTERNAL_ERROR: Failed to log out`

**Description:** Invalidates the current auth token in the token store.

## 4) Change Username/Password

**Path:** `PATCH /api/v1/account/credentials`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`
- `Content-Type: application/json`

**Request body:**
```json
{
  "currentPassword": "S3curePass!234",
  "newUsername": "player_two",
  "newPassword": "B3tt3rPass!456"
}
```

**Success response (200):**
```json
{
  "user": {
    "userId": "e64e6be8-254e-4d7e-9f96-bc6f4e5da0cc",
    "username": "player_two",
    "updatedAt": "2026-03-19T18:20:00Z"
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: no changes provided, invalid new username/password format, or weak password. Suggested match string: `VALIDATION_ERROR: Invalid credential update request`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `403 AUTH_ERROR`: current password is incorrect. Suggested match string: `AUTH_ERROR: Current password is incorrect`
- `409 CONFLICT_ERROR`: requested username is already in use. Suggested match string: `CONFLICT_ERROR: Username already exists`
- `500 INTERNAL_ERROR`: unexpected failure updating account record. Suggested match string: `INTERNAL_ERROR: Failed to update credentials`

**Description:** Updates username and/or password for the authenticated user. Require `currentPassword` when changing password (recommended for username too).

## 5) Delete Account

**Path:** `DELETE /api/v1/account`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`
- `Content-Type: application/json`

**Request body:**
```json
{
  "password": "B3tt3rPass!456",
  "deleteGames": true
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Account deleted.",
  "deleted": {
    "userId": "e64e6be8-254e-4d7e-9f96-bc6f4e5da0cc",
    "gamesRemoved": 12,
    "tokensRevoked": 3
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: missing password confirmation or invalid delete options. Suggested match string: `VALIDATION_ERROR: Invalid account deletion request`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `403 AUTH_ERROR`: provided password does not match account password. Suggested match string: `AUTH_ERROR: Password confirmation failed`
- `500 INTERNAL_ERROR`: unexpected failure deleting user, tokens, or related games. Suggested match string: `INTERNAL_ERROR: Failed to delete account`

**Description:** Permanently deletes the user account, revokes auth tokens, and deletes user games (or optionally keeps/anonymizes, depending on policy).

## 6) Create New Game

**Path:** `POST /api/v1/games`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`
- `Content-Type: application/json`

**Request body:**
```json
{
  "gameName": "Lunch Break #1",
  "difficulty": "medium"
}
```

**Success response (201):**
```json
{
  "game": {
    "gameId": "cb9bfc98-4f9b-4f5a-bf5f-0f405f5adb90",
    "gameName": "Lunch Break #1",
    "difficulty": "medium",
    "status": "in_progress",
    "startedAt": "2026-03-19T18:30:00Z",
    "lastUpdated": "2026-03-19T18:30:00Z",
    "duration": 0,
    "board": {
      "tiles": [],
      "numMines": 50,
      "minesFound": 0,
      "minesLeft": 50
    }
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: invalid `difficulty` or game name constraints not met. Suggested match string: `VALIDATION_ERROR: Invalid game creation request`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `500 INTERNAL_ERROR`: unexpected board generation or persistence failure. Suggested match string: `INTERNAL_ERROR: Failed to create game`

**Description:** Creates a new game for a logged-in user and stores initial game state.

## 7) List Past Games

**Path:** `GET /api/v1/games?status={in_progress|won|lost}&difficulty={easy|medium|hard}&limit={1..100}&cursor={opaque}`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:** none

**Success response (200):**
```json
{
  "games": [
    {
      "gameId": "cb9bfc98-4f9b-4f5a-bf5f-0f405f5adb90",
      "gameName": "Lunch Break #1",
      "difficulty": "medium",
      "status": "in_progress",
      "startedAt": "2026-03-19T18:30:00Z",
      "lastUpdated": "2026-03-19T18:43:22Z",
      "duration": 802
    }
  ],
  "nextCursor": "eyJsYXN0S2V5IjoiLi4uIn0="
}
```

Note: "nextCursor" represents the pagination token for the next page of results, to paginate across large numbers
of results.

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: invalid filter or pagination query params (`status`, `difficulty`, `limit`, `cursor`). Suggested match string: `VALIDATION_ERROR: Invalid games query parameters`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `500 INTERNAL_ERROR`: unexpected failure reading games from storage. Suggested match string: `INTERNAL_ERROR: Failed to list games`

**Description:** Returns paginated game history for the authenticated user (all games or filtered by status/difficulty).

## 8) View Single Past Game (Completed or Lost)

**Path:** `GET /api/v1/games/{gameId}`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:** none

**Success response (200):**
```json
{
  "game": {
    "gameId": "aa12d6bb-6db9-4ac9-b741-5f49f44913b9",
    "gameName": "Evening Run",
    "difficulty": "easy",
    "status": "won",
    "startedAt": "2026-03-16T21:00:00Z",
    "lastUpdated": "2026-03-16T21:07:35Z",
    "duration": 455,
    "board": {
      "tiles": [],
      "numMines": 10,
      "minesFound": 10,
      "minesLeft": 0
    }
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: malformed `gameId` path parameter. Suggested match string: `VALIDATION_ERROR: Invalid gameId`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `404 NOT_FOUND`: game does not exist or does not belong to authenticated user. Suggested match string: `NOT_FOUND: Game not found`
- `500 INTERNAL_ERROR`: unexpected failure reading game state. Suggested match string: `INTERNAL_ERROR: Failed to get game`

**Description:** Returns full game state by ID for the authenticated user. Useful for viewing completed/lost games.

## 9) Resume In-Progress Game

**Path:** `POST /api/v1/games/{gameId}/resume`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:**
```json
{}
```

**Success response (200):**
```json
{
  "game": {
    "gameId": "cb9bfc98-4f9b-4f5a-bf5f-0f405f5adb90",
    "gameName": "Lunch Break #1",
    "difficulty": "medium",
    "status": "in_progress",
    "startedAt": "2026-03-19T18:30:00Z",
    "lastUpdated": "2026-03-19T18:45:10Z",
    "duration": 910,
    "board": {
      "tiles": [],
      "numMines": 50,
      "minesFound": 8,
      "minesLeft": 42
    }
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: malformed `gameId` path parameter. Suggested match string: `VALIDATION_ERROR: Invalid gameId`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `404 NOT_FOUND`: game does not exist or does not belong to authenticated user. Suggested match string: `NOT_FOUND: Game not found`
- `409 CONFLICT_ERROR`: game is already `won` or `lost` and cannot be resumed. Suggested match string: `CONFLICT_ERROR: Game is not resumable`
- `500 INTERNAL_ERROR`: unexpected failure loading resumable state. Suggested match string: `INTERNAL_ERROR: Failed to resume game`

**Description:** Loads and returns a game only if it is still `in_progress`; otherwise return validation/conflict error.

## 10) Save Updated Game State

**Path:** `PUT /api/v1/games/{gameId}`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`
- `Content-Type: application/json`

**Request body:**
```json
{
  "status": "in_progress",
  "duration": 950,
  "board": {
    "tiles": [],
    "numMines": 50,
    "minesFound": 9,
    "minesLeft": 41
  },
  "lastMoveAt": "2026-03-19T18:46:02Z"
}
```

**Success response (200):**
```json
{
  "game": {
    "gameId": "cb9bfc98-4f9b-4f5a-bf5f-0f405f5adb90",
    "status": "in_progress",
    "lastUpdated": "2026-03-19T18:46:02Z",
    "duration": 950
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: malformed `gameId`, invalid board payload, invalid status value, or invalid duration. Suggested match string: `VALIDATION_ERROR: Invalid game update payload`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `404 NOT_FOUND`: game does not exist or does not belong to authenticated user. Suggested match string: `NOT_FOUND: Game not found`
- `409 CONFLICT_ERROR`: attempted invalid state transition (for example, updating a finished game as `in_progress`). Suggested match string: `CONFLICT_ERROR: Invalid game state transition`
- `500 INTERNAL_ERROR`: unexpected failure persisting updated game state or score write. Suggested match string: `INTERNAL_ERROR: Failed to update game`

**Description:** Persists latest board and metadata for a logged-in user. If status transitions to `won` or `lost`, finalize game and write score when `won`.

## 11) Delete Game

**Path:** `DELETE /api/v1/games/{gameId}`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:** none

**Success response (200):**
```json
{
  "success": true,
  "message": "Game deleted.",
  "deleted": {
    "gameId": "cb9bfc98-4f9b-4f5a-bf5f-0f405f5adb90"
  }
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: malformed `gameId` path parameter. Suggested match string: `VALIDATION_ERROR: Invalid gameId`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `404 NOT_FOUND`: game does not exist or does not belong to authenticated user. Suggested match string: `NOT_FOUND: Game not found`
- `500 INTERNAL_ERROR`: unexpected failure deleting game record. Suggested match string: `INTERNAL_ERROR: Failed to delete game`

**Description:** Deletes one game record belonging to the authenticated user.

## 12) List User Scores (Completed Games)

**Path:** `GET /api/v1/scores?difficulty={easy|medium|hard}&limit={1..100}&cursor={opaque}`  
**Necessary headers:**
- `Authorization: Bearer <authToken>`

**Request body:** none

**Success response (200):**
```json
{
  "scores": [
    {
      "gameId": "aa12d6bb-6db9-4ac9-b741-5f49f44913b9",
      "gameName": "Evening Run",
      "difficulty": "easy",
      "duration": 455,
      "completedAt": "2026-03-16T21:07:35Z"
    }
  ],
  "nextCursor": null
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: invalid `difficulty`, `limit`, or `cursor` query params. Suggested match string: `VALIDATION_ERROR: Invalid scores query parameters`
- `401 AUTH_ERROR`: missing, expired, or invalid auth token. Suggested match string: `AUTH_ERROR: Invalid or expired token`
- `500 INTERNAL_ERROR`: unexpected failure reading user score records. Suggested match string: `INTERNAL_ERROR: Failed to list scores`

**Description:** Returns the authenticated user’s completed-game scores, optionally filtered by difficulty.

## 13) Leaderboard (Top Scores)

**Path:** `GET /api/v1/leaderboard?difficulty={easy|medium|hard}&limit={1..100}`  
**Necessary headers:**
- `Accept: application/json`

**Request body:** none

**Success response (200):**
```json
{
  "difficulty": "easy",
  "entries": [
    {
      "rank": 1,
      "username": "speedy_miner",
      "duration": 120,
      "gameId": "ff20a709-1cf7-4490-a4d2-97280522cb68",
      "completedAt": "2026-03-18T09:01:10Z"
    },
    {
      "rank": 2,
      "username": "player_two",
      "duration": 130,
      "gameId": "dc7100f4-e58f-4684-91f6-a1abca8fdd77",
      "completedAt": "2026-03-18T10:15:41Z"
    }
  ]
}
```

**Error response:** Shared Error Response shape, with these codes:
- `400 VALIDATION_ERROR`: invalid `difficulty` or `limit` query params. Suggested match string: `VALIDATION_ERROR: Invalid leaderboard query parameters`
- `500 INTERNAL_ERROR`: unexpected failure reading leaderboard records. Suggested match string: `INTERNAL_ERROR: Failed to load leaderboard`

**Description:** Returns top scores for a difficulty level (lower duration is better). Can be public or auth-only based on product choice.
