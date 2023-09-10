import { Show, createSignal } from "solid-js";
import { BackButton } from "./ui/components";
import { formatNumberWithCommas } from "../utils/Calc";
export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = createSignal<number | null>(
    null
  );
  const [annualInterestRate, setAnnualInterestRate] = createSignal<
    number | null
  >(null);
  const [years, setYears] = createSignal<number | null>(null);
  const [investmentValue, setInvestmentValue] = createSignal<number | null>(
    null
  );

  function calcularInversion(event: Event) {
    event.preventDefault();
    const tasaInteresMensual = annualInterestRate()! / 12 / 100;
    const valorTotal =
      initialInvestment()! * Math.pow(1 + tasaInteresMensual, years()! * 12);
    const valorRedondeado = Math.round(valorTotal * 100) / 100;
    setInvestmentValue(valorRedondeado);
  }

  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form
        class="grid mr-2 place-content-center p-4  gap-4  md:border-4 md:shadow-white  rounded-3xl md:w-96 md:shadow-md appearance-none"
        onSubmit={calcularInversion}
      >
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de Inversión</h2>
        <label>Inversión Inicial</label>
        <input
          class="inputNumber"
          placeholder="Inversión Inicial"
          min={1}
          required
          type="number"
          value={initialInvestment() === null ? "" : initialInvestment()!}
          onInput={(e) => setInitialInvestment(Number(e.target.value))}
        />

        <label>Tasa de Interés Anual </label>
        <input
          type="number"
          min={1}
          max={100}
          placeholder="Tasa de Interés Anual"
          class={`inputNumber  ${
            annualInterestRate() !== null
              ? "peer invalid:border-red-500 invalid:focus:border-red-500"
              : ""
          }`}
          required
          value={annualInterestRate() === null ? "" : annualInterestRate()!}
          onInput={(e) => setAnnualInterestRate(Number(e.target.value))}
        />
        <p class="text-red-500 px-1 hidden peer-invalid:block">
          Valor Inválido (1-100)
        </p>
        <label>Número de Años</label>
        <input
          class="inputNumber"
          placeholder="Número de Años"
          min={1}
          required
          type="number"
          value={years() === null ? "" : years()!}
          onInput={(e) => setYears(parseInt(e.target.value, 10))}
        />

        <button
          class="border-4 rounded-3xl w-fit mx-auto  px-4 py-2  focus:outline-none focus:border-blue-500"
          type="submit"
        >
          Calcular
        </button>
        <Show when={investmentValue() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <p>
              El valor futuro : ${formatNumberWithCommas(investmentValue()!)}
            </p>
            <p>
              Ganancia: $
              {formatNumberWithCommas(
                investmentValue()! - initialInvestment()!
              )}
            </p>
          </div>
        </Show>
      </form>
    </div>
  );
}
