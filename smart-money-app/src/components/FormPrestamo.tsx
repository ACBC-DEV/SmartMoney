import { Show, createSignal } from "solid-js";
import { BackButton, ButtonSubmit } from "./ui/components";
import { formatNumberWithCommas, calculateMonthlyPayment } from "../utils/Calc";
function LoanCalculator() {
	const [loanAmount, setLoanAmount] = createSignal<number | null>(null);
	const [interestRate, setInterestRate] = createSignal<number | null>(null);
	const [loanTermInMonths, setLoanTermInMonths] = createSignal<number | null>(
		null,
	);
	const [result, setResult] = createSignal<number | null>(null);

	// Calcular la cuota mensual utilizando la función
	function handleMonthlyPayment(event: Event) {
		event.preventDefault();
		if (
			loanAmount() !== null &&
			interestRate() !== null &&
			loanTermInMonths() !== null
		) {
			const monthlyPayment = calculateMonthlyPayment(
				loanAmount() ?? 0,
				interestRate() ?? 0,
				loanTermInMonths() ?? 0,
			);
			setResult(monthlyPayment);
		}
	}

	return (
		<div class="grid mx-2 p-4 place-content-center">
			<form
				class="grid mr-2 place-content-center p-4  gap-4  md:border-4 md:shadow-white  rounded-3xl md:w-96 md:shadow-md "
				onSubmit={handleMonthlyPayment}
			>
				<BackButton />
				<h2 class="text-3xl font-semibold ">Calculadora de Préstamos</h2>

				<label>Monto del préstamo</label>
				<input
					class="inputNumber"
					type="number"
					value={loanAmount() === null ? "" : loanAmount() ?? 0}
					placeholder="Monto del préstamo"
					onChange={(e) =>
						setLoanAmount(Number.parseFloat(e.currentTarget.value))
					}
					min={1}
					required
				/>

				<label>Tasa de interés anual</label>
				<input
					type="number"
					min={1}
					max={100}
					class={`inputNumber  ${
						interestRate() !== null
							? "peer invalid:border-red-500 invalid:focus:border-red-500"
							: ""
					}`}
					value={interestRate() === null ? "" : interestRate() ?? 0}
					placeholder="Tasa de interés anual"
					onChange={(e) =>
						setInterestRate(Number.parseFloat(e.currentTarget.value))
					}
					required
				/>
				<p class="text-red-500 px-1 hidden peer-invalid:block">
					Valor Invalido (1-100)
				</p>
				<label>Plazo del préstamo en meses</label>
				<input
					type="number"
					class="inputNumber"
					value={loanTermInMonths() === null ? "" : loanTermInMonths() ?? 0}
					placeholder="Plazo del préstamo en meses"
					onChange={(e) =>
						setLoanTermInMonths(Number.parseFloat(e.currentTarget.value))
					}
					min={1}
					required
				/>

				<ButtonSubmit />
				<Show when={result() !== null}>
					<div class="border-4 p-4 rounded-3xl">
						<h2>Resultados:</h2>
						<p>Cuota Mensual: ${formatNumberWithCommas(result() ?? 0)}</p>
						<p>
							Total Pagado: $
							{formatNumberWithCommas(
								(result() ?? 0) * (loanTermInMonths() ?? 0),
							)}
						</p>
						<p>
							Interes Pagado: $
							{formatNumberWithCommas(
								(result() ?? 0) * (loanTermInMonths() ?? 0) -
									(loanAmount() ?? 0),
							)}
						</p>
					</div>
				</Show>
			</form>
		</div>
	);
}

export default LoanCalculator;
