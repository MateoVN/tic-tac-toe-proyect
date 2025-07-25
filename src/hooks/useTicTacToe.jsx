import confetti from "canvas-confetti"
import { chekWinner } from "../utils/helpers"
import { useState } from "react"
import { TURNS } from "../utils/constants"

export function useTicTacToe () {
    const[board, setBoard] = useState(() => {
      const boardFromLocalStorage = window.localStorage.getItem("board")
      return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
    })
      //Estado que maneja las dimensiones del tablero y el tipo de contenido
    
    const [turn, setTurn] = useState(() => {
      const turnFromLocalStorage = window.localStorage.getItem("turn")
      return turnFromLocalStorage ? JSON.parse(turnFromLocalStorage) :TURNS.X
    })
      //Estado que maneja de quien es el tuno del jugador "X" o el jugador "O"
    
    const [winner, setWinner] = useState(null)
      //Estado que guarda el ganador
    
    const [playHistorial, setPlayHistorial] = useState(() =>{
      const playHistorialFromLocalStorage = window.localStorage.getItem("playHistorial")
      return playHistorialFromLocalStorage ? JSON.parse(playHistorialFromLocalStorage) : []
    })

    const [btnHistorial , setBtnHistorial] = useState(false)

    const [previewingBoardIndex, setPreviewingBoardIndex] = useState(null)

    const updateBoard = (index) => {
    
        if (board[index] || winner) return
        //si la posion ? del board tiene algo o hay un ganar no altualiza o congela el juego
    
        const newBoard =[... board]
        //hace una  copia del tablero usando spread operator que copia los valores del array los descompone en valores individuales 
        //pero al estar dentro de un nuevo array funciona como una copia superficial 
        //Le llamamos una copia superficial ya que no apunta al mismo esapcio en memoria, tiene su propia autonomia pero posee los mismo valores
    
        newBoard[index] = turn
        //En el index que llega por prop buscamos su espacio dentro del array y le setteamos el turn en ese espacio
    
        setBoard(newBoard)//asicrono
        //El setteamos el nuevo board al estado board

        window.localStorage.setItem("board", JSON.stringify(newBoard))
    
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        //Si turn === que "X" newTurn = "O", si no newTurn = "X"
    
        setTurn(newTurn)
        //Settea el turn con la constante newTurn construida anteriorimente

        window.localStorage.setItem("turn", JSON.stringify(newTurn))
    
        const newWinner = chekWinner(newBoard)
        //Revisar si hay ganador, Guara la informacion en la constante
    
         if (newWinner) {
          // Si hay ganador
          setWinner(newWinner)
          confetti()
    
          setPlayHistorial(prev => {
            const newHistorial = [
              ...prev,
            {
              result: newWinner.winner, // ejemplo: "Ganador: X"
              board: newBoard
            }]

            window.localStorage.setItem("playHistorial", JSON.stringify(newHistorial))
            return newHistorial
         })

          } else if (!newBoard.includes(null)) {
            // Si NO hay ganador y no hay espacios vacíos = empate
            setWinner({ winner: null, combo: [] })
    
            setPlayHistorial(prev => {
              const newHistorial =[
                ...prev,
                {
                  result: "draw",
                  board: newBoard
                }
              ]
              window.localStorage.setItem("playHistorial", JSON.stringify(newHistorial))
              return newHistorial
            })
          }
    }

    const handleRestart = () => {
    
        setBoard(Array(9).fill(null)); 
        window.localStorage.setItem("board", JSON.stringify(Array(9).fill(null)))
        setTurn(TURNS.X); 
         window.localStorage.setItem("turn", JSON.stringify(TURNS.X))
        setWinner(null)
    
    }
      
    const handlePlayHistorial = () => {

        setBtnHistorial( prev => !prev)
    }

    const handlePreviewingBoard = (index) => {

        setPreviewingBoardIndex((prev) => (prev === index ? null : index))
    }
    
    const handleResetPlayHistorial = () => {
        setPlayHistorial([]); 
        window.localStorage.setItem("playHistorial", [])
    }

    return{
        board,
        turn,
        winner,
        playHistorial,
        btnHistorial,
        previewingBoardIndex,
        updateBoard,
        handleRestart,
        handlePlayHistorial,
        handlePreviewingBoard,
        handleResetPlayHistorial
    }
}