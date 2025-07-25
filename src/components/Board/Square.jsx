/* eslint-disable react/prop-types */
import { TURNS } from "../../utils/constants"


export function Square ({children, isSelected, updateBoard, index, winner, board}) {
  const className = `square ${isSelected ? 'is-selected':''} `
  //maneja las clases en el caso de que el casillero este vacio, sea "X" o sea "O"
  const isWinnerSquare = winner?.includes(index)
  const blueOrRed = board === TURNS.X ? "red": board == TURNS.O ?  "blue" : ""


  const handleClick = () =>{
    if (updateBoard) updateBoard(index);
  }
  //Cambia el upDateBoard llega por prorp

  return(
    <div 
      role="button"
      onClick={updateBoard ? handleClick : undefined} 
      className={`${className} ${isWinnerSquare ? 'isWinnerSquare' : ''} ${blueOrRed}`}
    >
      {children}
    </div>
  )
  //Devuelve un casillero con su contenido
}
