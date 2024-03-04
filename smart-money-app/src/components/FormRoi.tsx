import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
function calcularROI(beneficioNeto: number, inversionInicial: number): string {
  const roi = (beneficioNeto / inversionInicial - 1) * 100;
  return roi.toFixed(2);
}

function ROIForm() {
  const [profit, setProfit] = createSignal<number | null>(null);
  const [inversion, setInversion] = createSignal<number | null>(null);
  const [resultadoROI, setResultadoROI] = createSignal<number | null>(null);

  const calcularResultado = (e: Event) => {
    e.preventDefault();

    const roi = ((profit()! - inversion()!) / inversion()!) * 100;
    setResultadoROI(roi);
  };

  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form class="base-form" onSubmit={calcularResultado}>
        <BackButton />
        <h2 class="text-3xl font-semibold ">Calculadora de ROI</h2>
        <label>Inversión inicial</label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="Inversión"
          value={inversion() === null ? "" : inversion()!}
          onChange={(e) => setInversion(parseFloat(e.target.value))}
        />
        <label>Beneficio neto</label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="Salario"
          value={profit() === null ? "" : profit()!}
          onChange={(e) => setProfit(parseFloat(e.target.value))}
        />
        <ButtonSubmit />
        <Show when={resultadoROI() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <p>Roi : {resultadoROI()?.toFixed(2)}%</p>
          </div>
        </Show>
      </form>
    </div>
  );
}

export default ROIForm;
