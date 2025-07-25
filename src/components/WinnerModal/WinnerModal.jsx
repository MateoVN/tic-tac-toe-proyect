/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Square } from "../Board/Square";
import "./WinnerModal.css"

export function WinnerModal ({winner, handleRestart}) {

    const [showWinnerModal, setShowWinnerModal] = useState(false)
    
      useEffect(() => {
    
        if (winner?.combo.length === 0) return setShowWinnerModal(true)
    
        if (winner) {
          const timer = setTimeout(() => {
            setShowWinnerModal(true)
          }, 1000) // 1 segundo
    
          return () => clearTimeout(timer) // Limpia si se reinicia antes de tiempo
        } else {
          setShowWinnerModal(false) // Si reiniciamos el juego, ocultamos el modal
        }
      }, [winner])

    return(
        <>
        {showWinnerModal && winner && (
          <section className='winner'>
            <div className='text'>
              {winner.winner === null ? (<h2>Draw</h2>) :<h2>¡Winner!</h2>}
              
              <div className='win'>
                <Square>{winner.winner? (winner.winner) : "/"}</Square>
              </div>
              <button onClick={handleRestart}>Play Again!</button>
            </div>
          </section>
        )}
        </>
    )
}
