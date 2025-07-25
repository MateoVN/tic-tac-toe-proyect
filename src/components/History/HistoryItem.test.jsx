import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HistoryItem } from "./HistoryItem";

/*
* 1- renderiza correctamente los resultados → Verifica que aparezca "Winner: X" y "Draw".
* 2- renderiza los botones con texto correcto → Verifica que los botones muestren "View Board".
* 3- llama a handlePreviewingBoard con el índice correcto → Simula un click y verifica que se llame con el índice.
* 4- muestra el tablero solo cuando el previewingBoardIndex coincide → Verifica que aparezca el tablero cuando el índice coincide. 
*/

describe("HistoryItem Cmponente", () =>{
    const fakeHistorial = [
        {
        result: "X",
        board: ["X", "O", null, "O", "X", null, null, null, null],
        },
        {
        result: "Draw",
        board: [null, null, null, null, null, null, null, null, null],
        },
    ];

    test("renderiza correctamente los resultados", () => {
        render(<HistoryItem 
                playHistorial={fakeHistorial}
                handlePreviewingBoard={() =>{}}
                previewingBoardIndex={null}
                />
        );

        // Verificamos que aparezca el texto "Winner: X"
        expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
        // Verificamos que aparezca el texto "Empathy"
        expect(screen.getByText(/Draw/i)).toBeInTheDocument();
    })

    test("renderiza los botones con texto correcto", () => {
        render(
            <HistoryItem
                playHistorial={fakeHistorial}
                handlePreviewingBoard={() => {}}
                previewingBoardIndex={null}
            />
        );
        const buttons = screen.getAllByRole("button");
        expect(buttons[0]).toHaveTextContent("View Board");
        expect(buttons[1]).toHaveTextContent("View Board");
    })

    test("llama a handlePreviewingBoard con el índice correcto", () => {
        const mockHandlePreviewingBoard = vi.fn();

        render(
            <HistoryItem
                playHistorial={fakeHistorial}
                handlePreviewingBoard={mockHandlePreviewingBoard}
                previewingBoardIndex={null}
            />
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);

        expect(mockHandlePreviewingBoard).toHaveBeenCalledWith(0);
    });
    
    test("muestra el tablero solo cuando el previewingBOardIndex coincide", () =>{
        render(
            <HistoryItem
                playHistorial={fakeHistorial}
                handlePreviewingBoard={() => {}}
                previewingBoardIndex={0}
            />
        );

        //Cuando previewingBoardIndex === 0 deberia renderizar al menos un Square
        const squares = screen.getAllByText(/X|O/i)
        expect(squares.length).toBeGreaterThan(0)
    })
})