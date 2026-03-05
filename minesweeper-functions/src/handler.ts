import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BOARD_MIN_COLUMNS, BOARD_MIN_ROWS, BoardSize, clampBoardSize, getNeighborPoints } from "minesweeper-shared";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const parseSize = (value: string | undefined, fallback: number): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? clampBoardSize(parsed, fallback, 24) : fallback;
  };

  const rows = parseSize(event.queryStringParameters?.rows, BOARD_MIN_ROWS);
  const columns = parseSize(event.queryStringParameters?.columns, BOARD_MIN_COLUMNS);
  const board: BoardSize = { rows, columns };
  const sampleCell = { row: 0, column: 0 };

  return {
    statusCode: 200,
    body: JSON.stringify({
      board,
      neighbors: getNeighborPoints(sampleCell, board)
    })
  };
};
