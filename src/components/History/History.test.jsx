import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { History } from "./History";

/*
 * 1- Renderizado condicional: No se muestra nada si btnHistorial es false.
 * 2- Mensaje vacío: Muestra el texto de "no hay partidas" si playHistorial está vacío.
 * 3- Renderizado de partidas: Muestra correctamente los resultados si hay historial.
 * 4- Interacciones: Comprueba que los botones ejecuten sus funciones (Reset y Close).
 */

describe("History Component", () => {
  test("muestra mensaje cuando no hay partidas", () => {
    render(
      <History
        btnHistorial={true}
        playHistorial={[]}
        handlePreviewingBoard={vi.fn()}
        previewingBoardIndex={null}
        setPlayHistorial={vi.fn()}
        handlePlayHistorial={vi.fn()}
        handleResetPlayHistorial={vi.fn()}
      />
    );

    expect(screen.getByText(/There are no games played yet./i)).toBeInTheDocument();
  });

  test("muestra partidas cuando hay historial", () => {
    const fakeHistorial = [
      { result: "X", board: Array(9).fill(null) },
      { result: "O", board: Array(9).fill(null) }
    ];

    render(
      <History
        btnHistorial={true}
        playHistorial={fakeHistorial}
        handlePreviewingBoard={vi.fn()}
        previewingBoardIndex={null}
        setPlayHistorial={vi.fn()}
        handlePlayHistorial={vi.fn()}
        handleResetPlayHistorial={vi.fn()}
      />
    );

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
    expect(screen.getByText(/Winner: O/i)).toBeInTheDocument();
  });

  test("ejecuta acciones al hacer clic en Reset y Close", () => {
    const mockReset = vi.fn();
    const mockClose = vi.fn();

    render(
      <History
        btnHistorial={true}
        playHistorial={[{ result: "X", board: Array(9).fill(null) }]}
        handlePreviewingBoard={vi.fn()}
        previewingBoardIndex={null}
        handlePlayHistorial={mockClose}
        handleResetPlayHistorial={mockReset}
      />
    );

    const resetButton = screen.getByText(/Reset/i);
    const closeButton = screen.getByText(/Close/i);

    fireEvent.click(resetButton);
    fireEvent.click(closeButton);

    expect(mockReset).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  test("no renderiza nada cuando btnHistorial es false", () => {
    const { container } = render(
      <History
        btnHistorial={false}
        playHistorial={[]}
        handlePreviewingBoard={vi.fn()}
        previewingBoardIndex={null}
        handlePlayHistorial={vi.fn()}
        handleResetPlayHistorial={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});