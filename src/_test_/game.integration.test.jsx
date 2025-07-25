import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Board } from "../components/Board/Board";
import { TURNS } from "../utils/constants";

// ✅ Mockeamos canvas-confetti para evitar errores en JSDOM
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

function TicTacToeWrapper() {
  const { board, updateBoard } = useTicTacToe();
  return <Board board={board} updateBoard={updateBoard} winner={null} />;
}

describe("Integración: partida completa", () => {
  test("X gana la partida y se actualiza correctamente el tablero", () => {
    render(<TicTacToeWrapper />);

    const squares = screen.getAllByRole("button", { hidden: true });

    // Secuencia (X, O, X, O, X)
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);

    // ✅ Verificamos que el tablero está actualizado
    expect(screen.getAllByText(TURNS.X)).toHaveLength(3);
    expect(screen.getAllByText(TURNS.O)).toHaveLength(2);
  });
});
