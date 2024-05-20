import { Show, createSignal } from "solid-js";
import { BackButton } from "./ui/components";
import { formatNumberWithCommas,calcularAhorros } from "../utils/Calc";
import { ButtonSubmit } from "./ui/components";

function CalculadoraAhorros() {
	const [montoInicial, setMontoInicial] = createSignal<number | null>(null);
	const [contribucionesRegulares, setContribucionesRegulares] = createSignal<
		number | null
	>(null);
	const [tasaInteresAnual, setTasaInteresAnual] = createSignal<number | null>(
		null,
	);
	const [plazoEnAnnos, setPlazoEnAnos] = createSignal<number | null>(null);
	const [valorFuturo, setValorFuturo] = createSignal<number | null>(null);

	function  handleAhoros(event: Event) {
		event.preventDefault();

		const totalAhorros=calcularAhorros(tasaInteresAnual()??0, montoInicial()??0, contribucionesRegulares()??0, plazoEnAnnos()??0);
		setValorFuturo(totalAhorros);
	}

	return (
		<div class="grid mx-2 p-4 place-content-center">
			<form
				class="grid mr-2 place-content-center p-4 gap-4 md:border-4 md:shadow-white rounded-3xl md:w-96 md:shadow-md "
				onSubmit={handleAhoros}
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
					value={montoInicial() === null ? "" : montoInicial() ?? 0}
					onInput={(e) => setMontoInicial(Number.parseFloat(e.target.value))}
				/>

				<label>Contribuciones Regulares:</label>
				<input
					type="number"
					min={0}
					required
					class="inputNumber"
					placeholder="Ingrese las contribuciones regulares"
					value={
						contribucionesRegulares() === null
							? ""
							: contribucionesRegulares() ?? 0
					}
					onInput={(e) =>
						setContribucionesRegulares(Number.parseFloat(e.target.value))
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
					value={tasaInteresAnual() === null ? "" : tasaInteresAnual() ?? 0}
					onInput={(e) =>
						setTasaInteresAnual(Number.parseFloat(e.target.value))
					}
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
					value={plazoEnAnnos() === null ? "" : plazoEnAnnos() ?? 0}
					onInput={(e) => setPlazoEnAnos(Number.parseInt(e.target.value, 10))}
				/>
				<ButtonSubmit />
				<Show when={valorFuturo() !== null}>
					<div class="border-4 p-4 rounded-3xl">
						<p>
							El valor futuro de tus ahorros es: $
							{formatNumberWithCommas(valorFuturo() ?? 0)}
						</p>
					</div>
				</Show>
			</form>
		</div>
	);
}

export default CalculadoraAhorros;
