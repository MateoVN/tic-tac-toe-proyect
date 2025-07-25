import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { WinnerModal } from "./WinnerModal";
import { TURNS } from "../../utils/constants";

/*
 * 1- no muestra el modal cuando no hay ganador
 *     Verifica que el modal no se renderiza si winner es null.

 * 2- muestra 'Draw' cuando es un empate
 *     Verifica que cuando winner.winner === null y combo está vacío, se muestra el texto "Draw" y el símbolo /.
 *
 * 3- muestra 'Winner!' y el símbolo del ganador después de 1 segundo
 *     Usa waitFor para esperar el retraso de setTimeout en el useEffect, y verifica que aparece el texto y el símbolo del ganador.
 *
 * 4- llama a handleRestart al hacer clic en 'Play Again!'
 *     Simula un clic en el botón y asegura que se llama a la función handleRestart.
 */

describe("WinnerModal Component", () => {
  
    test("no muestra el modal cuando no hay ganador", () => {
        render(<WinnerModal winner={null} handleRestart={() => {}} />);
        expect(screen.queryByText(/Winner!/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Draw/i)).not.toBeInTheDocument();
    });

    test("muestra 'Draw' cuando es un empate", async () => {
        const fakeWinner = { winner: null, combo: [] };

        render(<WinnerModal winner={fakeWinner} handleRestart={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText(/Draw/i)).toBeInTheDocument();
            expect(screen.getByText("/")).toBeInTheDocument();
        });
    });

    test("muestra 'Winner!' y el símbolo del ganador después de 1 segundo", async () => {
        const fakeWinner = { winner: TURNS.X, combo: [0, 1, 2] };

        render(<WinnerModal winner={fakeWinner} handleRestart={() => {}} />);

        await waitFor(
            () => {
            expect(screen.getByText(/Winner!/i)).toBeInTheDocument();
            expect(screen.getByText(TURNS.X)).toBeInTheDocument();
            },
            { timeout: 1500 } // Espera un poco más de 1 segundo
        );
    });

    test("llama a handleRestart al hacer clic en 'Play Again!'", async () => {
        const fakeWinner = { winner: TURNS.O, combo: [3, 4, 5] };
        const mockRestart = vi.fn();

        render(<WinnerModal winner={fakeWinner} handleRestart={mockRestart} />);

        await waitFor(
            () => {
            expect(screen.getByText(/Winner!/i)).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        fireEvent.click(screen.getByRole("button", { name: /Play Again!/i }));
        expect(mockRestart).toHaveBeenCalledTimes(1);
        });
    });
