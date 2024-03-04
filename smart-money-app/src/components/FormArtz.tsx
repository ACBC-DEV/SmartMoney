import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import ArtzTable from "../components/ui/ArtzTable";
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
  function reset(e: Event) {
    e.preventDefault();
    setPrincipal(null);
    setInterestRate(null);
    setTerm(null);
    setMonthlyPayment(null);
  }
  return (
    <>
      <Show
        when={monthlyPayment() === null}
        fallback={
          <div class="flex gap-x-2 justify-center mt-4">
            <BackButton />

            <div
              class="md:border-4 rounded-3xl cursor-pointer px-4 py-2 w-fit text-center mb-2"
              onClick={reset}
            >
              <img src="../../../public/rotate-clockwise.svg" alt="" />
            </div>
          </div>
        }
      >
        <div class="grid place-content-center   md:h-full ">
          <form
            class="base-form  mx-auto mt-8"
            onSubmit={calculateMonthlyPayment}
          >
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
            <ButtonSubmit />
          </form>
        </div>
      </Show>
      <Show when={monthlyPayment() !== null}>
        <ArtzTable data={monthlyPayment()} />
      </Show>
    </>
  );
}

export default AmortizationCalculator;
//  <div class="md:border-4 grid  my-8 md:p-4 rounded-3xl">
//       <ul >
//         <li>Mes</li>
//         <li>Pago Mensual</li>
//         <li>Pago Principal</li>
//         <li>Pago de Intereses</li>
//         <li>Saldo Restante</li>
//       </ul>

//       <For each={monthlyPayment()!}>
//         {(item) => (
//           <ul class="px-2 flex justify-around  ">
//             <li class="text-right">{item.month}</li>
//             <li class="text-center">
//               ${formatNumberWithCommas(item.monthlyPayment)}
//             </li>
//             <li class="text-center">
//               ${formatNumberWithCommas(item.principalPayment)}
//             </li>
//             <li class="text-center">
//               ${formatNumberWithCommas(item.interestPayment)}
//             </li>
//             <li class="text-center">
//               ${formatNumberWithCommas(item.remainingBalance)}
//             </li>
//           </ul>
//         )}
//       </For>
// </div>
