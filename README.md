# Minesweeper Serverless

Lambda Function Notes:

Authentication:

- register
- login
- change username/pass
- logout

Game State

- create game
- get game
- list user games
- list user scores
- update game
- complete game

Leaderboard

- get leaderboard

## DynamoDB Tables

Users
---
user_id (uuid) * partition key
username (str)
password (str)
created_at (date)
updated_at (date)
scores (list of scores)

Note: scores are the number of minutes elapsed, lower score is better


AuthTokens
---
user_id (uuid) * partition key
authToken (str)
created_at (str)


Games
---
user_id (uuid) * partition key
game_id (uuid) * sort key
game_name (str)
board (serialized game board)
started_at (date)
last_updated (date)
status (str) - in progress, completed
difficulty (str) - easy, medium, hard


Leaderboard
---
username (str)
score (str) * sort key
difficulty (str) - easy, medium, hard * partition key


Logs
---
log_id (uuid) * partition key
level (str) * sort key
created_at (date)
message (str)