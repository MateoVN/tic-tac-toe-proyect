import { TURNS, WINNER_COMBOS } from "./constants"

export const chekWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      //Recorre los combos de WINNER_COMBOS, que es un array de arrays
      const [a, b, c] = combo
      //settea los valores individuales de cada combo en las constantes a, b y c
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        //Genera una condicion en el caso de que exista a y a = b y a = c 
        //osea si el combo es un mismo tipo hay un ganador
      ){
        return {winner:boardToCheck[a], combo}
      }
    }
    // si no hay ganador
    return null
}

export const victoryCounter = (playHistorial) =>{
    const victoriesOfX = playHistorial.filter((play) => play.result === TURNS.X).length
    const victoriesOfO = playHistorial.filter((play) => play.result === TURNS.O).length
    const draw = playHistorial.filter((play) => play.result === "draw" ).length

    return{
      victoriesOfX,
      victoriesOfO,
      draw,
    }
}