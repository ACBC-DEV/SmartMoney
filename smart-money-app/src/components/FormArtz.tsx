import { For, Show, createSignal } from "solid-js";
import { BackButton } from "./ui/components";

import {
  formatNumberWithCommas,
  calculateAmortizationSchedule,
  type AmortizationScheduleItem,
} from "../utils/Calc";
function AmortizationCalculator() {
  const [principal, setPrincipal] = createSignal<number | null>(null); // Monto del préstamo
  const [interestRate, setInterestRate] = createSignal<number | null>(null); // Tasa de interés anual en porcentaje
  const [term, setTerm] = createSignal<number | null>(null); // Plazo del préstamo en meses
  const [monthlyPayment, setMonthlyPayment] = createSignal<
    AmortizationScheduleItem[] | null
  >(null);
  // Función para calcular la cuota mensual
  function calculateMonthlyPayment(event: Event) {
    event.preventDefault();
    const data = calculateAmortizationSchedule(
      principal()!,
      interestRate()!,
      term()!
    );
    setMonthlyPayment(data);
  }

  return (
    <div class="grid place-content-center md:h-full ">
      <form class="base-form  mx-auto mt-8" onSubmit={calculateMonthlyPayment}>
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de Amortización</h2>
        <label>Monto del Préstamo:</label>
        <input
          class="inputNumber"
          type="number"
          placeholder="Monto del Préstamo"
          value={principal() === null ? "" : principal()!}
          onchange={(e) => setPrincipal(Number(e.target.value))}
          required
        />

        <label>Tasa de Interés Anual (%):</label>
        <input
          class={`inputNumber  ${
            interestRate() !== null
              ? "peer invalid:border-red-500 invalid:focus:border-red-500"
              : ""
          }`}
          placeholder="Tasa de Interés Anual"
          min={1}
          max={100}
          type="number"
          value={interestRate() === null ? "" : interestRate()!}
          onInput={(e) => setInterestRate(+e.target.value)}
          required
        />
        <p class="text-red-500 px-1 hidden peer-invalid:block">
          Valor Invalido (1-100)
        </p>
        <label>Plazo del préstamo en meses</label>
        <input
          class="inputNumber"
          type="number"
          placeholder="Plazo del préstamo en meses"
          value={term() === null ? "" : term()!}
          onInput={(e) => setTerm(+e.target.value)}
          required
        />
        <button
          class="border-4 rounded-3xl w-fit mx-auto  px-4 py-2 hover:border-blue-500 focus:outline-none focus:border-blue-500 "
          type="submit"
        >
          Calcular
        </button>
      </form>
      <Show when={monthlyPayment() !== null}>
        <div class="md:border-4 grid  my-8 md:p-4 rounded-3xl">
          <ul class="px-1 py-4 md:p-4 md:border-4 flex justify-around  items-center rounded-3xl">
            <li>Mes</li>
            <li>Pago Mensual</li>
            <li>Pago Principal</li>
            <li>Pago de Intereses</li>
            <li>Saldo Restante</li>
          </ul>

          <For each={monthlyPayment()!}>
            {(item) => (
              <ul class="px-2 flex justify-around  items-center">
                <li>{item.month}</li>
                <li>${formatNumberWithCommas(item.monthlyPayment)}</li>
                <li>${formatNumberWithCommas(item.principalPayment)}</li>
                <li>${formatNumberWithCommas(item.interestPayment)}</li>
                <li>${formatNumberWithCommas(item.remainingBalance)}</li>
              </ul>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default AmortizationCalculator;
