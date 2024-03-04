import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas } from "../utils/Calc";
function validar(taxt: "IVA" | "4x1000") {
  if (taxt === "IVA") {
    return {
      title: "Calculadora de IVA (Colombia)",
      taxt: 0.19,
    };
  } else {
    return {
      title: "Calculadora de 4x1000 (Colombia)",
      taxt: 0.004,
    };
  }
}
function FormTaxas({ taxt }: { taxt: "IVA" | "4x1000" }) {
  const [valor, setValor] = createSignal<number | null>(null);
  const [result, setResult] = createSignal<number | null>(null);
  const taxtValues = validar(taxt);
  function taxtCalc(e: Event) {
    e.preventDefault();
    setResult(valor()! * taxtValues.taxt);
  }
  return (
    <div class="grid mx-2 p-4 place-content-center">
      <form
        class="grid mr-2 place-content-center p-4 gap-4 md:border-4 md:shadow-white rounded-3xl md:w-96 md:shadow-md "
        onSubmit={taxtCalc}
      >
        <BackButton />
        <h2 class="text-3xl font-semibold ">{taxtValues.title}</h2>
        <label>Valor transaccion </label>
        <input
          class="inputNumber"
          min={1}
          required
          type="number"
          placeholder="transaccion"
          value={valor() === null ? "" : valor()!}
          onInput={(e) => setValor(parseFloat(e.target.value))}
        />

        <ButtonSubmit />
        <Show when={result() !== null}>
          <div class="border-4 p-4 rounded-3xl">
            <h2 class="text-xl font-semibold">
              Valor de Impuesto: {formatNumberWithCommas(result()!)}
            </h2>
          </div>
        </Show>
      </form>
    </div>
  );
}

export default FormTaxas;
