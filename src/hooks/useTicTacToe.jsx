import confetti from "canvas-confetti"
import { chekWinner } from "../utils/helpers"
import { useState } from "react"
import { TURNS } from "../utils/constants"

export function useTicTacToe () {

    const[board, setBoard] = useState(Array(9).fill(null))
      //Estado que maneja las dimensiones del tablero y el tipo de contenido
    
    const [turn, setTurn] = useState(TURNS.X)
      //Estado que maneja de quien es el tuno del jugador "X" o el jugador "O"
    
    const [winner, setWinner] = useState(null)
      //Estado que guarda el ganador
    
    const [playHistorial, setPlayHistorial] = useState([])

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
    
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        //Si turn === que "X" newTurn = "O", si no newTurn = "X"
    
        setTurn(newTurn)
        //Settea el turn con la constante newTurn construida anteriorimente
    
        
        const newWinner = chekWinner(newBoard)
        //Revisar si hay ganador, Guara la informacion en la constante
    
         if (newWinner) {
          // Si hay ganador
          setWinner(newWinner)
          confetti()
    
          setPlayHistorial(prev => ([
            ...prev,
            {
              result: newWinner.winner, // ejemplo: "Ganador: X"
              board: newBoard
            }
          ]))
          } else if (!newBoard.includes(null)) {
            // Si NO hay ganador y no hay espacios vacíos = empate
            setWinner({ winner: null, combo: [] })
    
            setPlayHistorial(prev => ([
              ...prev,
              {
                result: "draw",
                board: newBoard
              }
            ]))
          }
    }

    const handleRestart = () => {
    
        setBoard(Array(9).fill(null)); 
        setTurn(TURNS.X); 
        setWinner(null)
    
    }
      
    const handlePlayHistorial = () => {

        setBtnHistorial( prev => !prev)
    }

    const handlePreviewingBoard = (index) => {

        setPreviewingBoardIndex((prev) => (prev === index ? null : index))
    }

    return{
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
    }
}