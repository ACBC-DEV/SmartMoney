import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas,getPercentagesBasedResult } from "../utils/Calc";

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
		const rta  = getPercentagesBasedResult(valor() ??0)
		setPorcentajes(rta)
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
					value={valor() === null ? "" : valor() ?? 0}
					onInput={(e) => setValor(Number.parseFloat(e.target.value))}
				/>

				<ButtonSubmit />
				<Show when={porcentajes() !== null}>
					<div class="border-4 p-4 rounded-3xl">
						<h2 class="text-xl font-semibold">Presupuesto Recomendado</h2>
						<ul >
							<li >
								Gastos: {formatNumberWithCommas(porcentajes()?.Gastos ?? 0)}
							</li>
							<li>Ocio: {formatNumberWithCommas(porcentajes()?.Ocio ?? 0)}</li>
							<li>
								Emergencias:
								{formatNumberWithCommas(porcentajes()?.Emergencias ?? 0)}
							</li>
							<li>
								Inversiones:
								{formatNumberWithCommas(porcentajes()?.Inversiones ?? 0)}
							</li>
							<li>
								Fondo de Retiro:
								{formatNumberWithCommas(porcentajes()?.FondoRetiro ?? 0)}
							</li>
						</ul>
					</div>
				</Show>
			</form>
		</div>
	);
}

export default FormPres;
