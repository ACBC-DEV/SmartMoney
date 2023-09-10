import { render, screen, fireEvent } from "solid-js/testing";
import CalculadoraInversion from "./CalculadoraInversion";

describe("Calculadora de Inversión", () => {
  it("calcula la inversión correctamente", async () => {
    // Renderiza el componente
    const { container } = render(() => <CalculadoraInversion />);

    // Obtén los elementos de entrada
    const initialInvestmentInput = screen.getByLabelText("Inversión Inicial:");
    const interestRateInput = screen.getByLabelText(
      "Tasa de Interés Anual (%):"
    );
    const yearsInput = screen.getByLabelText("Número de Años:");

    // Simula la entrada de valores
    fireEvent.input(initialInvestmentInput, { target: { value: "10000" } });
    fireEvent.input(interestRateInput, { target: { value: "5" } });
    fireEvent.input(yearsInput, { target: { value: "10" } });

    // Encuentra el botón de cálculo y simula hacer clic
    const calculateButton = screen.getByText("Calcular");
    fireEvent.click(calculateButton);

    // Espera a que se actualice el resultado
    await screen.findByText("El valor futuro de tu inversión es: $16288.95");

    // Verifica que el resultado sea correcto
    expect(container).toHaveTextContent(
      "El valor futuro de tu inversión es: $16288.95"
    );
  });
});
