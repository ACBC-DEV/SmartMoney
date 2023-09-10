import { Show, createSignal } from "solid-js";
import { BackButton } from "./ui/components";
import { formatNumberWithCommas } from "../utils/Calc";

function CalculadoraAhorros() {
  const [montoInicial, setMontoInicial] = createSignal<number | null>(null);
  const [contribucionesRegulares, setContribucionesRegulares] = createSignal<
    number | null
  >(null);
  const [tasaInteresAnual, setTasaInteresAnual] = createSignal<number | null>(
    null
  );
  const [plazoEnAnos, setPlazoEnAnos] = createSignal<number | null>(null);
  const [valorFuturo, setValorFuturo] = createSignal<number | null>(null);

  function calcularAhorros(event: Event) {
    event.preventDefault();
    const tasaInteresMensual = tasaInteresAnual()! / 12 / 100;
    let totalAhorros = montoInicial()!;
    let contribucionTotal = 0;

    for (let i = 0; i < plazoEnAnos()! * 12; i++) {
      contribucionTotal += contribucionesRegulares()!;
      totalAhorros *= 1 + tasaInteresMensual;
      totalAhorros += contribucionesRegulares()!;
    }

    setValorFuturo(totalAhorros);
  }

  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form
        class="grid mr-2 place-content-center p-4 gap-4 md:border-4 md:shadow-white rounded-3xl md:w-96 md:shadow-md "
        onSubmit={calcularAhorros}
      >
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de Ahorros</h2>
        <label>Monto Inicial:</label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="Ingrese el monto inicial"
          value={montoInicial() === null ? "" : montoInicial()!}
          onInput={(e) => setMontoInicial(parseFloat(e.target.value))}
        />

        <label>Contribuciones Regulares:</label>
        <input
          type="number"
          min={0}
          required
          class="inputNumber"
          placeholder="Ingrese las contribuciones regulares"
          value={
            contribucionesRegulares() === null ? "" : contribucionesRegulares()!
          }
          onInput={(e) =>
            setContribucionesRegulares(parseFloat(e.target.value))
          }
        />

        <label>Tasa de Interés Anual</label>
        <input
          type="number"
          min={1}
          max={100}
          class={`inputNumber   ${
            tasaInteresAnual() !== null
              ? "peer invalid:border-red-500 invalid:focus:border-red-500"
              : ""
          }`}
          required
          placeholder="Ingrese la tasa de interés anual"
          value={tasaInteresAnual() === null ? "" : tasaInteresAnual()!}
          onInput={(e) => setTasaInteresAnual(parseFloat(e.target.value))}
        />
        <p class="text-red-500 px-1 hidden peer-invalid:block">
          Valor Inválido (1-100)
        </p>

        <label>Plazo en Años:</label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="Ingrese el plazo en años"
          value={plazoEnAnos() === null ? "" : plazoEnAnos()!}
          onInput={(e) => setPlazoEnAnos(parseInt(e.target.value, 10))}
        />

        <button
          class="border-4 rounded-3xl w-fit mx-auto  px-4 py-2  focus:outline-none focus:border-blue-500"
          type="submit"
        >
          Calcular
        </button>

        <Show when={valorFuturo() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <p>
              El valor futuro de tus ahorros es: $
              {formatNumberWithCommas(valorFuturo()!)}
            </p>
          </div>
        </Show>
      </form>
    </div>
  );
}

export default CalculadoraAhorros;
