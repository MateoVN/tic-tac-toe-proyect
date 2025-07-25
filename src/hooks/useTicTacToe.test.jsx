import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { useTicTacToe } from "./useTicTacToe";
import { TURNS } from "../utils/constants";
import * as helpers from "../utils/helpers";
import confetti from "canvas-confetti";

/*
 * 1- Estado inicial → Verifica valores por defecto.

 * 2- Movimiento válido → Actualiza casilla y cambia turno.

 * 3- Movimiento en casilla ocupada → No actualiza.

 * 4- Movimiento cuando hay ganador → No actualiza.

 * 5- Ganador detectado → winner se setea, se llama confetti y se guarda en historial.

 * 6- Empate → Detecta empate y lo guarda en historial.

 * 7- Reiniciar juego → Tablero y turno vuelven a valores iniciales.

 * 8- Historial → Alterna visibilidad.

 * 9- Previewing board → Muestra y oculta correctamente un tablero previo. 
 */

// 🔹 Mockeamos confetti para no ejecutarlo en los tests
vi.mock("canvas-confetti", () => ({
  default: vi.fn()
}));

// 🔹 Mockeamos checkWinner para controlar los resultados
vi.mock("../utils/helpers", () => ({
  chekWinner: vi.fn()
}));

describe("useTicTacToe Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    window.localStorage.clear(); // Limpia todo el localStorage antes de cada test
  });

  test("inicia con el estado correcto", () => {
    const { result } = renderHook(() => useTicTacToe());

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.turn).toBe(TURNS.X);
    expect(result.current.winner).toBe(null);
    expect(result.current.playHistorial).toEqual([]);
    expect(result.current.btnHistorial).toBe(false);
    expect(result.current.previewingBoardIndex).toBe(null);
  });

  test("actualiza el tablero y cambia de turno", () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.updateBoard(0);
    });

    expect(result.current.board[0]).toBe(TURNS.X);
    expect(result.current.turn).toBe(TURNS.O);
  });

  test("no actualiza si la casilla ya está ocupada", () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.updateBoard(0);
      result.current.updateBoard(0);
    });

    expect(result.current.board[0]).toBe(TURNS.X);
    expect(result.current.turn).toBe(TURNS.O); // no cambió turno dos veces
  });

  test("no actualiza si ya hay un ganador", () => {
    // Mock para que el tercer movimiento sea ganador
    helpers.chekWinner
        .mockReturnValueOnce(null)  // Después del primer movimiento
        .mockReturnValueOnce(null)  // Después del segundo movimiento
        .mockReturnValueOnce({ winner: TURNS.X, combo: [0, 1, 2] }); // Después del tercer movimiento

    const { result } = renderHook(() => useTicTacToe());

    // Simulamos un juego que produce un ganador
    act(() => {
        result.current.updateBoard(0); // X
        result.current.updateBoard(3); // O
        result.current.updateBoard(1); // X - Aquí se establece el ganador
    });

    // Intento de movimiento después de tener ganador
    act(() => {
        result.current.updateBoard(2); // Este movimiento no debería registrarse
    });

    expect(result.current.board[2]).toBe(null);
  });

  test("detecta un ganador y actualiza playHistorial", () => {
    helpers.chekWinner.mockReturnValueOnce({
      winner: TURNS.X,
      combo: [0, 1, 2]
    });

    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.updateBoard(0);
    });

    expect(result.current.winner).toEqual({
      winner: TURNS.X,
      combo: [0, 1, 2]
    });
    expect(confetti).toHaveBeenCalled();
    expect(result.current.playHistorial).toHaveLength(1);
    expect(result.current.playHistorial[0].result).toBe(TURNS.X);
  });

  test("detecta empate y lo guarda en playHistorial", () => {
    helpers.chekWinner.mockReturnValue(null); // Usa mockReturnValue en lugar de mockReturnValueOnce

    const { result } = renderHook(() => useTicTacToe());

    // Simulamos 9 movimientos para llenar el tablero
    for (let i = 0; i < 9; i++) {
        act(() => {
        result.current.updateBoard(i);
        });
    }

    expect(result.current.winner).toEqual({ winner: null, combo: [] });
    expect(result.current.playHistorial[result.current.playHistorial.length - 1].result).toBe("draw");
  });

  test("reinicia correctamente el juego", () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.updateBoard(0);
      result.current.handleRestart();
    });

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.turn).toBe(TURNS.X);
    expect(result.current.winner).toBe(null);
  });

  test("alternar el historial con handlePlayHistorial", () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.handlePlayHistorial();
    });

    expect(result.current.btnHistorial).toBe(true);

    act(() => {
      result.current.handlePlayHistorial();
    });

    expect(result.current.btnHistorial).toBe(false);
  });

  test("cambia el previewingBoardIndex correctamente", () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.handlePreviewingBoard(2);
    });
    expect(result.current.previewingBoardIndex).toBe(2);

    act(() => {
      result.current.handlePreviewingBoard(2); // desactiva
    });
    expect(result.current.previewingBoardIndex).toBe(null);
  });
});