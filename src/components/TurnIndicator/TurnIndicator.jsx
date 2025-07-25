/* eslint-disable react/prop-types */
import { TURNS } from "../../utils/constants";
import { Square } from "../Board/Square";
import "./TurnIndicator.css"

export function TurnIndicator ({turn}) {
    return(
        <section className='turn'>
            <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
            </Square>
      </section>
    )
}