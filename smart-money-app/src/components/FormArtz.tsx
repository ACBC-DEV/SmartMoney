import { Show, createSignal } from "solid-js";
import { AgainButton, BackButton, ButtonSubmit } from "./ui/components";
import ArtzTable from "../components/ui/ArtzTable";
import {
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
			principal() ?? 0,
			interestRate() ?? 0,
			term() ?? 0,
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
						<AgainButton onClick={reset} />
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
						<label for="principal">Monto del Préstamo:</label>
						<input
							id="principal"
							class="inputNumber"
							type="number"
							placeholder="Monto del Préstamo"
							value={principal() === null ? "" : (principal() ?? 0)}
							onchange={(e) => setPrincipal(Number(e.target.value))}
							required
						/>

						<label for="interestRate">Tasa de Interés Anual (%):</label>
						<input
							id="interestRate"
							class={`inputNumber  ${
								interestRate() !== null
									? "peer invalid:border-red-500 invalid:focus:border-red-500"
									: ""
							}`}
							placeholder="Tasa de Interés Anual"
							min={1}
							max={100}
							type="number"
							value={interestRate() === null ? "" : (interestRate() ?? 0)}
							onInput={(e) => setInterestRate(+e.target.value)}
							required
						/>
						<p class="text-red-500 px-1 hidden peer-invalid:block">
							Valor Invalido (1-100)
						</p>
						<label for="term">Plazo del préstamo en meses</label>
						<input
							id="term"
							class="inputNumber"
							type="number"
							placeholder="Plazo del préstamo en meses"
							value={term() === null ? "" : (term() ?? 0)}
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
