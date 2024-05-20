import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas ,calcularInversion} from "../utils/Calc";
export default function InvestmentCalculator() {
	const [initialInvestment, setInitialInvestment] = createSignal<number | null>(
		null,
	);
	const [annualInterestRate, setAnnualInterestRate] = createSignal<
		number | null
	>(null);
	const [years, setYears] = createSignal<number | null>(null);
	const [investmentValue, setInvestmentValue] = createSignal<number | null>(
		null,
	);

	function handlerInversion(event: Event) {
		event.preventDefault();
		const valorRedondeado = calcularInversion(annualInterestRate() ?? 0, initialInvestment() ?? 0, years() ?? 0);
		setInvestmentValue(valorRedondeado);
	}

	return (
		<div class="grid mx-2 p-4 place-content-center">
			<form
				class="grid mr-2 place-content-center p-4  gap-4  md:border-4 md:shadow-white  rounded-3xl  md:shadow-md appearance-none"
				onSubmit={handlerInversion}
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
					value={initialInvestment() === null ? "" : initialInvestment() ?? 0}
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
					value={annualInterestRate() === null ? "" : annualInterestRate() ?? 0}
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
					value={years() === null ? "" : years() ?? 0}
					onInput={(e) => setYears(Number.parseInt(e.target.value, 10))}
				/>

				<ButtonSubmit />
				<Show when={investmentValue() !== null}>
					<div class="border-4 p-4 rounded-3xl">
						<p>
							El valor futuro : $
							{formatNumberWithCommas(investmentValue() ?? 0)}
						</p>
						<p>
							Ganancia: $
							{formatNumberWithCommas(
								(investmentValue() ?? 0) - (initialInvestment() ?? 0),
							)}
						</p>
					</div>
				</Show>
			</form>
		</div>
	);
}
