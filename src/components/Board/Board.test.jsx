import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Board } from "./Board";
import { TURNS } from "../../utils/constants";

/**
 * 1- renderiza los 9 casilleros correctamente
 *      Verifica que el tablero siempre tenga 9 casilleros (Square).
 *
 * 2- muestra correctamente las X y O en el tablero
 *      Comprueba que las X y O se rendericen en las posiciones correctas.
 *
 * 3- llama a updateBoard con el índice correcto al hacer clic
 *      Simula clics en diferentes casilleros y valida que se llame a updateBoard con el índice correcto.
 *
 * 4- aplica la clase isWinnerSquare a los casilleros ganadores
 *      Si hay un ganador, los casilleros del combo deben tener la clase isWinnerSquare.
 *
 */

describe("Board Component", () => {
  test("renderiza los 9 casilleros correctamente", () => {
    const fakeBoard = Array(9).fill(null);

    render(<Board board={fakeBoard} updateBoard={() => {}} winner={null} />);

    const squares = screen.getAllByRole("button", { hidden: true }); 
    expect(squares).toHaveLength(9);
  });

  test("muestra correctamente las X y O en el tablero", () => {
    const fakeBoard = [TURNS.X, TURNS.O, null, TURNS.X, null, TURNS.O, null, null, TURNS.X];

    render(<Board board={fakeBoard} updateBoard={() => {}} winner={null} />);

    expect(screen.getAllByText(TURNS.X)).toHaveLength(3);
    expect(screen.getAllByText(TURNS.O)).toHaveLength(2);
  });

  test("llama a updateBoard con el índice correcto al hacer clic", () => {
    const fakeBoard = Array(9).fill(null);
    const mockUpdateBoard = vi.fn();

    render(<Board board={fakeBoard} updateBoard={mockUpdateBoard} winner={null} />);

    const squares = screen.getAllByRole("button", { hidden: true });
    fireEvent.click(squares[0]);
    fireEvent.click(squares[5]);

    expect(mockUpdateBoard).toHaveBeenCalledTimes(2);
    expect(mockUpdateBoard).toHaveBeenCalledWith(0);
    expect(mockUpdateBoard).toHaveBeenCalledWith(5);
  });

 test("aplica la clase isWinnerSquare a los casilleros ganadores", () => {
    const fakeBoard = [TURNS.X, TURNS.X, TURNS.X, null, null, null, null, null, null];
    const fakeWinner = { winner: TURNS.X, combo: [0, 1, 2] };

    render(<Board board={fakeBoard} updateBoard={() => {}} winner={fakeWinner} />);

    const winnerSquares = screen.getAllByText(TURNS.X);

    winnerSquares.forEach(square => {
        expect(square).toHaveClass("isWinnerSquare"); 
    });
 });
});