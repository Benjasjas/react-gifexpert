import { fireEvent, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";
import { AddCategory } from "../src/components";

describe("Pruebas en GifExpertApp", () => {
  test("Debe de hacer match con el snapshot", () => {
    render(<GifExpertApp />);
    expect(screen.getByText("GifExpertApp")).toMatchSnapshot();
  });

  test("Debe de renderizar GifExpertApp correctamente", () => {
    render(<GifExpertApp />);
    expect(screen.getByText("GifExpertApp")).toBeTruthy();
  });

  test("Debe de renderizar las categorias iniciales", () => {
    render(<GifExpertApp />);
    expect(screen.getByText("One Piece")).toBeTruthy();
  });

  test("Debe de agregar una nueva categoria cuando onAddCategory se llame", () => {
    render(<GifExpertApp />);
    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: "Naruto" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(screen.getByText("Naruto")).toBeTruthy();
    expect(screen.getByText("One Piece")).toBeTruthy();
  });

  test("No debe de duplicarse la misma categoria", () => {
    render(<GifExpertApp />);
    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: "One Piece" } });
    fireEvent.submit(screen.getByRole("form"));
    const categories = screen.getAllByText("One Piece");
    expect(categories.length).toBe(1);
  });

  test("No debe de agregar una categoria vacia o solo con espacios en blanco", () => {
    render(<GifExpertApp />);
    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: " " } });
    fireEvent.submit(screen.getByRole("form"));

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(screen.getByRole("form"));

    const categories = screen.getAllByRole("heading", { level: 3 });
    expect(categories.length).toBe(1);
  });

  test("Debe de limpiar el formulario después de agregar una nueva categoria", () => {
    render(<GifExpertApp />);
    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: "Naruto" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(input.value).toBe("");
  });

  test("Debe de renderizar el componente GifGrid para cada categoria", () => {
    render(<GifExpertApp />);
    expect(screen.getByText("One Piece")).toBeTruthy();

    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: "Naruto" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(screen.getByText("Naruto")).toBeTruthy();
    expect(screen.getByText("One Piece")).toBeTruthy();
  });

  test("Debe de llamar a onNewCategory con el valor correcto en AddCategory", () => {
    const mockOnNewCategory = jest.fn();
    render(<AddCategory onNewCategory={mockOnNewCategory} />);

    const input = screen.getByPlaceholderText("Buscar gif");
    fireEvent.change(input, { target: { value: "Naruto" } });
    fireEvent.submit(screen.getByRole("form"));

    expect(mockOnNewCategory).toHaveBeenCalledWith("Naruto");
  });
});
