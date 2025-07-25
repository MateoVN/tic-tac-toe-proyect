/* eslint-disable react/prop-types */
import { Square } from "./Square"
import "./Board.css"

export function Board ({board, updateBoard, winner}) {
    return(
        <section className='game'>
            {
                board.map((_,index) => {
                    return(
                        <Square
                        key={index} 
                        index={index}
                        updateBoard={updateBoard}
                        winner={winner?.combo || []}
                        board={board[index]}>
                        {board[index]}
                        </Square>
                    )})
            } 
        </section>
    )
}