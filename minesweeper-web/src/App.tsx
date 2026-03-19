import { useMemo } from 'react'
import './App.css'
import GameBoard from './GameBoard'
import { FakeData } from 'minesweeper-shared/src/FakeData'
import type { Game } from 'minesweeper-shared/src/models/Game'

function App() {
  const game = useMemo<Game>(() => {
    return FakeData.instance.createGame({
      difficulty: 'easy',
      status: 'in_progress',
    })
  }, [])

  return (
    <main className="app-shell">
      <p className="app-label">Minesweeper · Easy</p>
      <GameBoard board={game} />
    </main>
  )
}

export default App
