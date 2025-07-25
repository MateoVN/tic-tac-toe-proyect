import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TurnIndicator } from "./TurnIndicator";
import { TURNS } from "../../utils/constants";

/*
* 1- Comprueba que el componente siempre renderice X y O.
* 2- Comprueba que solo el turno activo tenga la clase is-selected.
* 3- Asegura que el estado visual cambie correctamente según el turno. 
*/

describe("TurnIndicator Component", () => {
    test("rederiza X y O", () => {
        render(<TurnIndicator turn={TURNS.X}/>);
        expect(screen.getByText(TURNS.X)).toBeInTheDocument();
        expect(screen.getByText(TURNS.O)).toBeInTheDocument();
    });

    test("marca como seleccionado el turno X",() => {
        render(<TurnIndicator turn={TURNS.X}/>)
        const xSquare = screen.getByText(TURNS.X);
        const oSquare = screen.getByText(TURNS.O);

        expect(xSquare).toHaveClass("is-selected");
        expect(oSquare).not.toHaveClass("is-selected");
    })

    test("marca como seleccionado el turno O",() => {
        render(<TurnIndicator turn={TURNS.O}/>)
        const xSquare = screen.getByText(TURNS.X);
        const oSquare = screen.getByText(TURNS.O);

        expect(xSquare).not.toHaveClass("is-selected");
        expect(oSquare).toHaveClass("is-selected");
    })
})