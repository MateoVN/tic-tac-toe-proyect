/* eslint-disable react/prop-types */
import './App.css'
import { Board } from './components/Board/Board'
import { WinnerModal } from './components/WinnerModal/WinnerModal'
import { VictoryCounter } from './components/VictoryCounter/VictoryCounter'
import { History } from './components/History/History'
import { TurnIndicator } from './components/TurnIndicator/TurnIndicator'
import { useTicTacToe } from './hooks/useTicTacToe'


//Posicion en el los casillero que en el caso de ser de un mismo tipo ("X" o "O")
//se decide un ganor y se termina el juego

function App() {
  
  const {
    board,
    turn,
    winner,
    playHistorial,
    btnHistorial,
    previewingBoardIndex,
    setPlayHistorial,
    updateBoard,
    handleRestart,
    handlePlayHistorial,
    handlePreviewingBoard
  } = useTicTacToe()

  

  return (

    <main className='board'>

      <h1>Tic Tac Toe</h1>

      <VictoryCounter
        playHistorial={playHistorial}
      />

      <Board
        board={board}
        updateBoard={updateBoard}
        winner={winner}
      />

      <TurnIndicator
        turn={turn}
      />

      <section>
        <button onClick={handleRestart}>Restart The Game</button>
        <button onClick={handlePlayHistorial}>Play History</button>
      </section>

        <WinnerModal
          winner={winner}
          handleRestart={handleRestart}
        />

        <History
          btnHistorial={btnHistorial}
          playHistorial={playHistorial}
          handlePreviewingBoard={handlePreviewingBoard}
          previewingBoardIndex={previewingBoardIndex}
          setPlayHistorial={setPlayHistorial}
          handlePlayHistorial={handlePlayHistorial}
        />

    </main>
  )
}

export default App
