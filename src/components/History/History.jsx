/* eslint-disable react/prop-types */
import { HistoryItem } from "./HistoryItem";
import "./History.css"

export function History ({btnHistorial, playHistorial, handlePreviewingBoard, previewingBoardIndex, handlePlayHistorial, handleResetPlayHistorial}) {
    return(
        <>
            {btnHistorial && (
            <section className="historial">
                <div className='historial-content'>
                <h2>Game history</h2>
                {playHistorial.length === 0 ? (
                    <p>There are no games played yet.</p>
                ) : (
                    <ul>
                    <HistoryItem
                        playHistorial={playHistorial}
                        handlePreviewingBoard={handlePreviewingBoard}
                        previewingBoardIndex={previewingBoardIndex}
                    />
                    </ul>
                )}
                <div>
                    <button onClick={handleResetPlayHistorial}>Reset</button>
                    <button onClick={handlePlayHistorial}>Close</button>
                </div>
                
                </div>
                
            </section>
            )}
        </>
    )
}