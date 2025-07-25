import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Square } from "./Square";
import { TURNS } from "../../utils/constants";

/*
 *   1- renderiza correctamente el contenido
 *         Verifica que el Square muestra correctamente el texto o símbolo que recibe como children.
 *         (Ejemplo: si recibe X, debe aparecer en pantalla).
 *
 *   2- aplica la clase is-selected cuando isSelected es true
 *         Comprueba que si el prop isSelected es true, el componente agrega la clase is-selected.
 *
 *   3- no aplica la clase is-selected cuando isSelected es false
 *         Confirma que si isSelected es false, no se agrega la clase is-selected.
 *
 *   4- aplica la clase red cuando board es X
 *         Valida que si board={TURNS.X}, el Square tenga la clase red.
 *
 *   5- aplica la clase blue cuando board es O
 *         Valida que si board={TURNS.O}, el Square tenga la clase blue.
 *
 *   6- aplica la clase isWinnerSquare si index está en winner
 *         Comprueba que si el index del casillero está dentro del array winner, el Square muestra la clase isWinnerSquare.
 *
 *   7- llama a updateBoard al hacer clic si se pasa como prop
 *         Simula un clic en el Square y verifica que se llame a la función updateBoard con el index correcto.
 *
 *   8- NO llama a updateBoard si no se pasa como prop
 *        Simula un clic y confirma que no ocurre nada si no se le pasa updateBoard como prop.
 */

describe("Square Component", () => {
  test("renderiza correctamente el contenido", () => {
    render(<Square>X</Square>);
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  test("aplica la clase is-selected cuando isSelected es true", () => {
    render(<Square isSelected={true}>X</Square>);
    const square = screen.getByText("X");
    expect(square).toHaveClass("is-selected");
  });

  test("no aplica la clase is-selected cuando isSelected es false", () => {
    render(<Square isSelected={false}>O</Square>);
    const square = screen.getByText("O");
    expect(square).not.toHaveClass("is-selected");
  });

  test("aplica la clase red cuando board es X", () => {
    render(<Square board={TURNS.X}>X</Square>);
    const square = screen.getByText("X");
    expect(square).toHaveClass("red");
  });

  test("aplica la clase blue cuando board es O", () => {
    render(<Square board={TURNS.O}>O</Square>);
    const square = screen.getByText("O");
    expect(square).toHaveClass("blue");
  });

  test("aplica la clase isWinnerSquare si index está en winner", () => {
    render(<Square index={1} winner={[1, 2, 3]}>X</Square>);
    const square = screen.getByText("X");
    expect(square).toHaveClass("isWinnerSquare");
  });

  test("llama a updateBoard al hacer clic si se pasa como prop", () => {
    const mockUpdateBoard = vi.fn();
    render(<Square index={0} updateBoard={mockUpdateBoard}>X</Square>);
    const square = screen.getByText("X");

    fireEvent.click(square);

    expect(mockUpdateBoard).toHaveBeenCalledTimes(1);
    expect(mockUpdateBoard).toHaveBeenCalledWith(0);
  });

  test("NO llama a updateBoard si no se pasa como prop", () => {
    const mockUpdateBoard = vi.fn();
    render(<Square index={0}>X</Square>);
    const square = screen.getByText("X");

    fireEvent.click(square);

    expect(mockUpdateBoard).not.toHaveBeenCalled();
  });
});