export type Point = { row: number; column: number };
export type BoardSize = { rows: number; columns: number };

const DIRECTIONS: readonly Point[] = [
  { row: -1, column: -1 },
  { row: -1, column: 0 },
  { row: -1, column: 1 },
  { row: 0, column: -1 },
  { row: 0, column: 1 },
  { row: 1, column: -1 },
  { row: 1, column: 0 },
  { row: 1, column: 1 }
];

export const BOARD_MIN_ROWS = 3;
export const BOARD_MIN_COLUMNS = 3;

export function clampBoardSize(value: number, min = BOARD_MIN_ROWS, max = 30): number {
  return Math.min(Math.max(value, min), max);
}

// Returns the valid neighbor coordinates for the given cell.
export function getNeighborPoints(cell: Point, board: BoardSize): Point[] {
  return DIRECTIONS.map((direction) => ({
    row: cell.row + direction.row,
    column: cell.column + direction.column
  })).filter(
    (candidate) =>
      candidate.row >= 0 &&
      candidate.row < board.rows &&
      candidate.column >= 0 &&
      candidate.column < board.columns
  );
}
