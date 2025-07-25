/* eslint-disable react/prop-types */
import { victoryCounter } from "../../utils/helpers"
import "./VictoryCounter.css"

export function VictoryCounter ({playHistorial}) {

    const { victoriesOfX, victoriesOfO, draw } = victoryCounter(playHistorial)

    return(
        <section className='victories-counter'>
            <p style={{gridColumn:"2", gridRow:"1"}}>X</p>
            <p style={{gridColumn:"2", gridRow:"2"}}>{victoriesOfX}</p>
            <p style={{gridColumn:"3", gridRow:"1"}}>O</p>
            <p style={{gridColumn:"3", gridRow:"2"}}>{victoriesOfO}</p>
            <p style={{gridColumn:"4", gridRow:"1"}}>Draw</p>
            <p style={{gridColumn:"4", gridRow:"2"}}>{draw}</p>
            <p style={{gridColumn:"1", gridRow:"1/3", display:"flex", alignItems:"center"}}>Victories Counter</p>
        </section>
    )
}