import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas } from "../utils/Calc";
function LoanCalculator() {
  const [loanAmount, setLoanAmount] = createSignal<number | null>(null);
  const [interestRate, setInterestRate] = createSignal<number | null>(null);
  const [loanTermInMonths, setLoanTermInMonths] = createSignal<number | null>(
    null
  );
  const [result, setResult] = createSignal<number | null>(null);

  // Calcular la cuota mensual utilizando la función
  function calculateMonthlyPayment(event: Event) {
    event.preventDefault();

    if (
      loanAmount() !== null &&
      interestRate() !== null &&
      loanTermInMonths() !== null
    ) {
      // Verificar que los valores sean números positivos y válidos
      if (
        loanAmount()! > 0 &&
        interestRate()! >= 1 &&
        loanTermInMonths()! >= 1
      ) {
        // Convertir la tasa de interés anual a mensual
        const monthlyInterestRate = interestRate()! / 12 / 100;

        // Calcular la cuota mensual
        const monthlyPayment =
          (loanAmount()! * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -loanTermInMonths()!));

        setResult(monthlyPayment);
      } else {
        // Mostrar un mensaje de error si alguno de los valores no es válido
        alert(
          "Por favor, ingrese valores válidos (monto y plazo mayores que 0, tasa de interés mayor o igual a 1)."
        );
        setResult(null);
      }
    } else {
      // Mostrar un mensaje de error si algún valor es nulo
      alert("Por favor, ingrese todos los valores requeridos.");
      setResult(null);
    }
  }

  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form
        class="grid mr-2 place-content-center p-4  gap-4  md:border-4 md:shadow-white  rounded-3xl md:w-96 md:shadow-md "
        onSubmit={calculateMonthlyPayment}
      >
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de Préstamos</h2>

        <label>Monto del préstamo</label>
        <input
          class="inputNumber"
          type="number"
          value={loanAmount() === null ? "" : loanAmount()!}
          placeholder="Monto del préstamo"
          onChange={(e) => setLoanAmount(parseFloat(e.currentTarget.value))}
          min={1}
          required
        />

        <label>Tasa de interés anual</label>
        <input
          type="number"
          min={1}
          max={100}
          class={`inputNumber  ${
            interestRate() !== null
              ? "peer invalid:border-red-500 invalid:focus:border-red-500"
              : ""
          }`}
          value={interestRate() === null ? "" : interestRate()!}
          placeholder="Tasa de interés anual"
          onChange={(e) => setInterestRate(parseFloat(e.currentTarget.value))}
          required
        />
        <p class="text-red-500 px-1 hidden peer-invalid:block">
          Valor Invalido (1-100)
        </p>
        <label>Plazo del préstamo en meses</label>
        <input
          type="number"
          class="inputNumber"
          value={loanTermInMonths() === null ? "" : loanTermInMonths()!}
          placeholder="Plazo del préstamo en meses"
          onChange={(e) =>
            setLoanTermInMonths(parseFloat(e.currentTarget.value))
          }
          min={1}
          required
        />

        <ButtonSubmit />
        <Show when={result() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <h2>Resultados:</h2>
            <p>Cuota Mensual: ${formatNumberWithCommas(result()!)}</p>
            <p>
              Total Pagado: $
              {formatNumberWithCommas(result()! * loanTermInMonths()!)}
            </p>
            <p>
              Interes Pagado: $
              {formatNumberWithCommas(
                result()! * loanTermInMonths()! - loanAmount()!
              )}
            </p>
          </div>
        </Show>
      </form>
    </div>
  );
}

export default LoanCalculator;
