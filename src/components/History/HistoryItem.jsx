/* eslint-disable react/prop-types */
import { Square } from "../Board/Square";

export function HistoryItem ({playHistorial, handlePreviewingBoard, previewingBoardIndex}) {
    return(
        <>
            {playHistorial.map((play, i) => (
                <li key={i}>
                    {`${play.result === "Empathy" ? "" : "Winner: "} ${play.result}`} 
                    <button onClick={() => handlePreviewingBoard(i)}>{previewingBoardIndex === i ? "Close" : "View Board"}</button>
                    
                    {previewingBoardIndex === i && (
                        <section className='game' style={{transform:"scale(0.5)", height:"fit-content"}}>
                        {play.board.map((cell, i) => (
                            <Square key={i}>{cell}</Square>
                        ))}
                        </section>
                    )}
                </li>
            ))}
        </>
    )
}