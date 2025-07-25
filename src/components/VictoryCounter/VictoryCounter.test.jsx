import { render, screen } from "@testing-library/react";
import { describe, expect, test} from "vitest";
import { VictoryCounter } from "./VictoryCounter";

/*
* 1- El test asegura que el componente renderiza correctamente etiquetas y valores de victorias/empates.
* 2- No prueba interacción, solo la UI estática con datos de prueba.
*/

describe("VictoryCounter Component", () => {

    test("muestra las victorias y empates ", () =>{
        const fakeHistorial = [
            { result: "X" },
            { result: "O" },
            { result: "X" },
            { result: "Draw" }
        ];

        render( <VictoryCounter playHistorial={fakeHistorial}/>);

         // Verifica etiquetas
        expect(screen.getByText("X")).toBeInTheDocument();
        expect(screen.getByText("O")).toBeInTheDocument();
        expect(screen.getByText("Draw")).toBeInTheDocument();

        // Verifica valores
        expect(screen.getByText("2")).toBeInTheDocument(); // X tiene 2 victorias
        expect(screen.getByText("1")).toBeInTheDocument(); // O tiene 1 victoria
        expect(screen.getByText("1")).toBeInTheDocument(); // Draw tiene 1 empate

    })
})