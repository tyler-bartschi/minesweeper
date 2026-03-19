import { JSX, useCallback, useMemo, useState } from 'react'
import type { Game, Tile } from 'minesweeper-shared/src/models/Game'
import { GameBoardPresenter } from './presenters/GameBoardPresenter'
import './gameboard.css'

interface GameBoardProps {
  board: Game
}

const GameBoard = ({ board }: GameBoardProps) => {
  const [, setRefresh] = useState(0)
  const refresh = useCallback(() => setRefresh((value) => value + 1), [])
  const presenter = useMemo(
    () => new GameBoardPresenter(board, { refresh }),
    [board, refresh],
  )

  const tiles = board.board.tiles
  const columnCount = Math.max(tiles[0]?.length ?? 0, 1)
  const flattenedTiles: Tile[] = tiles.flat()

  const renderTileFace = (tile: Tile) => {
    let face: string | number | null | JSX.Element = null

    if (tile.revealed) {
      if (tile.value === -1) {
        face = '💣'
      } else {
        face = tile.value > 0 ? tile.value : ''
      }
    } else if (tile.flagged) {
      face = <span className="flag-dot" aria-hidden="true" />
    }

    console.log('renderTileFace', tile.x, tile.y, face)
    return face
  }

  const tileClass = (tile: Tile) => {
    const classes = ['tile']
    if (tile.revealed) {
      classes.push('revealed')
    }
    if (tile.flagged) {
      classes.push('flagged')
    }

    return classes.join(' ')
  }

  return (
    <div
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 36px)` }}
    >
      {flattenedTiles.map((tile) => (
        <button
          key={`${tile.x}-${tile.y}`}
          type="button"
          className={tileClass(tile)}
          onClick={() => presenter.handleReveal(tile)}
          onContextMenu={(event) => {
            event.preventDefault()
            presenter.handleFlagToggle(tile)
          }}
        >
          {renderTileFace(tile)}
        </button>
      ))}
    </div>
  )
}

export default GameBoard
