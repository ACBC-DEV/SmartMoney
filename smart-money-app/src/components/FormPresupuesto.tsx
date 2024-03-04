import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas } from "../utils/Calc";

function FormPres() {
  interface Porcentajes {
    NivelSueldo: string;
    Gastos: number;
    Ocio: number;
    Emergencias: number;
    Inversiones: number;
    FondoRetiro: number;
  }
  const [valor, setValor] = createSignal<number | null>(null);
  const [porcentajes, setPorcentajes] = createSignal<Porcentajes | null>(null);

  function calcularResultado(event: Event) {
    event.preventDefault();

    if (valor()! <= 1000) {
      setPorcentajes({
        NivelSueldo: "Salario Mínimo",
        Gastos: valor()! * 0.6,
        Ocio: valor()! * 0.1,
        Emergencias: valor()! * 0.1,
        Inversiones: valor()! * 0.1,
        FondoRetiro: valor()! * 0.1,
      });
    } else if (valor()! <= 3000) {
      setPorcentajes({
        NivelSueldo: "Ingreso Promedio",
        Gastos: valor()! * 0.5,
        Ocio: valor()! * 0.15,
        Emergencias: valor()! * 0.1,
        Inversiones: valor()! * 0.15,
        FondoRetiro: valor()! * 0.1,
      });
    } else if (valor()! <= 5000) {
      setPorcentajes({
        NivelSueldo: "Alto Ingreso",
        Gastos: valor()! * 0.4,
        Ocio: valor()! * 0.2,
        Emergencias: valor()! * 0.1,
        Inversiones: valor()! * 0.2,
        FondoRetiro: valor()! * 0.1,
      });
    } else if (valor()! <= 10000) {
      setPorcentajes({
        NivelSueldo: "Ingreso Elevado",
        Gastos: valor()! * 0.3,
        Ocio: valor()! * 0.25,
        Emergencias: valor()! * 0.1,
        Inversiones: valor()! * 0.25,
        FondoRetiro: valor()! * 0.1,
      });
    } else {
      setPorcentajes({
        NivelSueldo: "Ingreso Alto",
        Gastos: valor()! * 0.2,
        Ocio: valor()! * 0.3,
        Emergencias: valor()! * 0.1,
        Inversiones: valor()! * 0.3,
        FondoRetiro: valor()! * 0.1,
      });
    }
  }

  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form
        class="grid mr-2 place-content-center p-4 gap-4 md:border-4 md:shadow-white rounded-3xl md:w-96 md:shadow-md "
        onSubmit={calcularResultado}
      >
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de Presupuesto</h2>
        <label>Salario en Dolares</label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="Salario"
          value={valor() === null ? "" : valor()!}
          onInput={(e) => setValor(parseFloat(e.target.value))}
        />

        <ButtonSubmit />
        <Show when={porcentajes() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <h2 class="text-xl font-semibold">Presupuesto Recomendado</h2>
            <ul>
              <li>Gastos: {formatNumberWithCommas(porcentajes()?.Gastos!)}</li>
              <li>Ocio: {formatNumberWithCommas(porcentajes()?.Ocio!)}</li>
              <li>
                Emergencias:
                {formatNumberWithCommas(porcentajes()?.Emergencias!)}
              </li>
              <li>
                Inversiones:
                {formatNumberWithCommas(porcentajes()?.Inversiones!)}
              </li>
              <li>
                Fondo de Retiro:
                {formatNumberWithCommas(porcentajes()?.FondoRetiro!)}
              </li>
            </ul>
          </div>
        </Show>
      </form>
    </div>
  );
}

export default FormPres;
