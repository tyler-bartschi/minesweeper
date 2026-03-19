import type { Game, Tile } from 'minesweeper-shared/src/models/Game'

export interface GameBoardView {
  refresh(): void
}

export class GameBoardPresenter {
  private readonly game: Game
  private readonly view: GameBoardView

  public constructor(game: Game, view: GameBoardView) {
    this.game = game
    this.view = view
  }

  public handleReveal(tile: Tile): void {
    if (tile.revealed || tile.flagged) {
      return
    }

    this.revealCascade(tile)
    this.view.refresh()
  }

  public handleFlagToggle(tile: Tile): void {
    if (tile.revealed) {
      return
    }

    this.game.board.flagTile(tile.x, tile.y, !tile.flagged)
    this.view.refresh()
  }

  private revealCascade(startTile: Tile): void {
    const queue: Tile[] = [startTile]
    const tilesGrid = this.game.board.tiles
    const visited = new Set<string>()

    while (queue.length) {
      const current = queue.shift()
      if (!current) {
        continue
      }

      const key = `${current.x}-${current.y}`
      if (visited.has(key)) {
        continue
      }

      visited.add(key)

      if (current.revealed || current.flagged) {
        continue
      }

      this.game.board.revealTile(current.x, current.y)

      if (current.value !== 0) {
        continue
      }

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) {
            continue
          }

          const nx = current.x + dx
          const ny = current.y + dy
          const neighbor = tilesGrid[ny]?.[nx]
          if (!neighbor) {
            continue
          }

          const neighborKey = `${neighbor.x}-${neighbor.y}`
          if (visited.has(neighborKey)) {
            continue
          }

          queue.push(neighbor)
        }
      }
    }
  }
}
