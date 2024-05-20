import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";

function ROIForm() {
	const [profit, setProfit] = createSignal<number | null>(null);
	const [inversion, setInversion] = createSignal<number | null>(null);
	const [resultadoROI, setResultadoROI] = createSignal<number | null>(null);

	const calcularResultado = (e: Event) => {
		e.preventDefault();

		const roi =
			((profit() ?? 0 - (inversion() ?? 0)) / (inversion() ?? 0)) * 100;
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
					value={inversion() === null ? "" : inversion() ?? 0}
					onChange={(e) => setInversion(Number.parseFloat(e.target.value))}
				/>
				<label>Beneficio neto</label>
				<input
					class="inputNumber"
					min={1}
					required
					type="number"
					placeholder="Salario"
					value={profit() === null ? "" : profit() ?? 0}
					onChange={(e) => setProfit(Number.parseFloat(e.target.value))}
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
