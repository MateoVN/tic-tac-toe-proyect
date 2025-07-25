import { describe, expect, test } from "vitest";
import { chekWinner } from "./helpers";
import { TURNS } from "./constants";

describe("chekWinner helper", () => {
  test("devuelve ganador cuando hay línea horizontal", () => {
    const board = [TURNS.X, TURNS.X, TURNS.X, null, null, null, null, null, null];
    const result = chekWinner(board);

    expect(result).toEqual({ winner: TURNS.X, combo: [0, 1, 2] });
  });

  test("devuelve ganador cuando hay línea vertical", () => {
    const board = [TURNS.O, null, null, TURNS.O, null, null, TURNS.O, null, null];
    const result = chekWinner(board);

    expect(result).toEqual({ winner: TURNS.O, combo: [0, 3, 6] });
  });

  test("devuelve ganador cuando hay línea diagonal", () => {
    const board = [TURNS.X, null, null, null, TURNS.X, null, null, null, TURNS.X];
    const result = chekWinner(board);

    expect(result).toEqual({ winner: TURNS.X, combo: [0, 4, 8] });
  });

  test("devuelve null si no hay ganador", () => {
    const board = [TURNS.X, TURNS.O, TURNS.X, TURNS.X, TURNS.O, TURNS.O, TURNS.O, TURNS.X, TURNS.X];
    const result = chekWinner(board);

    expect(result).toBe(null);
  });
});