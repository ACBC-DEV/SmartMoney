import type { string } from "astro/zod";

export function formatNumberWithCommas(number: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}
export interface AmortizationScheduleItem {
  month: number;
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export function calculateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTermInMonths: number
): AmortizationScheduleItem[] {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTermInMonths));

  let remainingBalance = loanAmount;
  const amortizationSchedule: AmortizationScheduleItem[] = [];

  for (let month = 1; month <= loanTermInMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    const scheduleItem: AmortizationScheduleItem = {
      month,
      monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance,
    };

    amortizationSchedule.push(scheduleItem);
  }

  return amortizationSchedule;
}

export function calcularAhorros(tasaInteresAnual: number, montoInicial: number, contribucionesRegulares: number, plazoEnAnnos: number): number {

  const tasaInteresMensual = tasaInteresAnual / 12 / 100;
  let totalAhorros = montoInicial
  let contribucionTotal = 0;

  for (let i = 0; i < plazoEnAnnos * 12; i++) {
    contribucionTotal += contribucionesRegulares
    totalAhorros *= 1 + tasaInteresMensual;
    totalAhorros += contribucionesRegulares;
  }

  return totalAhorros
}

export function calcularInversion(annualInterestRate: number, initialInvestment: number, years: number,) {
  const tasaInteresMensual = annualInterestRate / 12 / 100;
  const valorTotal =
    initialInvestment * Math.pow(1 + tasaInteresMensual, years * 12);
  const valorRedondeado = Math.round(valorTotal * 100) / 100;
  return valorRedondeado
}
export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTermInMonths: number,
) {
  // Verificar que los valores sean números positivos y válidos
  if (
    (loanAmount ?? 0) > 0 &&
    (interestRate ?? 0) >= 1 &&
    (loanTermInMonths ?? 0) >= 1
  ) {
    // Convertir la tasa de interés anual a mensual
    const monthlyInterestRate = interestRate / 12 / 100;

    // Calcular la cuota mensual
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      // biome-ignore lint/style/useExponentiationOperator: <explanation>
      (1 - Math.pow(1 + monthlyInterestRate, -(loanTermInMonths)));

    return monthlyPayment
  }
  return 0
}
type casePercentages = '1000' | '3000' | '5000' | '10000' | 'default';
const calculatePercentages = (per: casePercentages, value: number) => {
  const Object = {
    "1000": {
      NivelSueldo: "Salario Mínimo",
      Gastos: value * 0.6,
      Ocio: value * 0.1,
      Emergencias: value * 0.1,
      Inversiones: value * 0.1,
      FondoRetiro: value * 0.1,
    },
    "3000": {
      NivelSueldo: "Ingreso Promedio",
      Gastos: value * 0.5,
      Ocio: value * 0.15,
      Emergencias: value * 0.1,
      Inversiones: value * 0.15,
      FondoRetiro: value * 0.1,
    },
    "5000": {
      NivelSueldo: "Alto Ingreso",
      Gastos: value * 0.4,
      Ocio: value * 0.2,
      Emergencias: value * 0.1,
      Inversiones: value * 0.2,
      FondoRetiro: value * 0.1,
    },
    "10000": {
      NivelSueldo: "Ingreso Elevado",
      Gastos: value * 0.3,
      Ocio: value * 0.25,
      Emergencias: value * 0.1,
      Inversiones: value * 0.25,
      FondoRetiro: value * 0.1,
    },
    "default": {
      NivelSueldo: "Ingreso Alto",
      Gastos: value * 0.2,
      Ocio: value * 0.3,
      Emergencias: value * 0.1,
      Inversiones: value * 0.3,
      FondoRetiro: value * 0.1,
    },
  }
  return Object[per]
}

export function getPercentagesBasedResult(valor: number) {

  const value = valor ?? 0;
  if (value <= 1000) {
    return calculatePercentages('1000', value)
  } else if (value <= 3000) {
    return calculatePercentages('3000', value)
  } else if (value <= 5000) {
    return calculatePercentages('5000', value)
  } else if (value <= 10000) {
    return calculatePercentages('10000', value)
  } else {
    return calculatePercentages('default', value)
  }
}
