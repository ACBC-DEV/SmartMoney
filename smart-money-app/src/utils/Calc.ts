// export function formatNumberWithCommas(number: number): string {
//   const num = number.toFixed(2);
//   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
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
